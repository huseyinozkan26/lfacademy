
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { toast } from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const signIn = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const logOut = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const updateUser = async data => {
    try {
        console.log(data)
        await updateProfile(auth.currentUser, data).then(() => {
            toast.success("Güncelleme Başarılı")
        })
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const setUserData = async (userValue) => {
    try {
        const db = getDatabase();
        const userId = auth.currentUser.uid;


        // Önce mevcut verileri alıyoruz
        const userRef = ref(db, 'user_' + userId);
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};


        const newData = {
            ...currentData,
            uid: userId,
            phone: userValue.phone || null,
            role: userValue.role || null,
            tcKimlik: userValue.tcKimlik || null,
            birthDate: userValue.birthDate || null,
            veliAdi: userValue.veliAdi || null,
            veliMail: userValue.veliMail || null,
            veliTelefon: userValue.veliTelefon || null
        };

        set(userRef, newData);
    } catch (error) {
        toast.error(error)
    }
}

export const getUserData = async (uid) => {
    const dbRef = ref(getDatabase());
    const userId = uid;
    let return_data = {}
    await get(child(dbRef, 'user_' + userId)).then((snapshoot) => {
        if (snapshoot.exists()) {
            return_data = snapshoot.val()
        } else {
            return_data = { error: "kullanıcı bulunamadı" }
        }
    }).catch((error) => {
        return_data = { error: error }
    })
    return return_data
}

export const getEducations = async (categorie) => {
    const dbRef = ref(getDatabase());
    let return_data = []
    await get(child(dbRef, 'educations')).then((snapshoot) => {
        if (snapshoot.exists) {
            return_data = snapshoot.val()
        } else {
            return_data = { error: "Kayıtlı dersz" }
        }
    }).catch((error) => {
        return_data = { error: error }
    })
    return return_data;
}


onAuthStateChanged(auth, (user) => {
    if (user) {
        let _user = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName
        }

        store.dispatch(loginHandle(_user))
    } else {
        store.dispatch(logoutHandle())
    }
});

export const getScormValueByKey = async (key) => {
    try {
        const db = getDatabase();
        const adress = '/educations/education_yazilim/lessons/web/scorms';
        const userRef = ref(db, adress);
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};
        return currentData;
    } catch (error) {
        return error.message;
    }
}

export const getProgress = async (scormValues) => {
    try {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const lessonCode = scormValues.lessonCode;
        const scormId = scormValues.key;
        const adress = 'user_' + userId + "/scormValues/" + lessonCode + "/" + scormId + "/";
        const userRef = ref(db, adress);

        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};
        return currentData;
    } catch (error) {
        return error.message;
    }

}

export const onLiveStart = async (liveValues) => {
    console.log(liveValues);
    try {
        const db = getDatabase();
        // Önce mevcut verileri alıyoruz
        const strLessonName = liveValues.lesson_name;
        console.log(strLessonName);
        const userRef = ref(db, 'livelessons/');
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};
    
        const newData = {
            ...currentData,
            [strLessonName]:{
                lesson_name: liveValues.lesson_name,
                teacher: liveValues.teacher,
                active: liveValues.active
            }
        };
        console.log(newData);
        // Oluşturduğumuz yeni verileri set fonksiyonu ile güncelliyoruz
        set(userRef, newData);
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
}
export const onLiveStop = async (liveValues) => {
    console.log(liveValues);
    try {
        const db = getDatabase();
        // Önce mevcut verileri alıyoruz
        const strLessonName = liveValues.lesson_name;
        console.log(strLessonName);
        const userRef = ref(db, 'livelessons/'+liveValues.lesson_name+'/active/');
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};
    
        const newData = {
          
        };
        console.log(newData);
        // Oluşturduğumuz yeni verileri set fonksiyonu ile güncelliyoruz
        set(userRef, newData);
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
}

export const onScormChange = async (scormValues) => {
    try {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const lessonCode = scormValues.lessonCode;
        const scormId = scormValues.key;
        const name = scormValues.name;

        // Önce mevcut verileri alıyoruz
        const userRef = ref(db, 'user_' + userId);
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};

        // Mevcut verilere scormValues alanını ekleyerek yeni bir obje oluşturuyoruz
        const newData = {
            ...currentData,
            scormValues: {
                ...currentData.scormValues,
                [lessonCode]: {
                    ...currentData.scormValues?.[lessonCode],
                    [scormId]: {
                        scormId: scormId,
                        name: name,
                        lessonCode: lessonCode,
                        progress: scormValues.progress,
                        progressSeconds: scormValues.progressSeconds
                    }
                },
            },
        };

        // Oluşturduğumuz yeni verileri set fonksiyonu ile güncelliyoruz
        set(userRef, newData);
    } catch (error) {
        toast.error(error.message);
    }

}

export default app