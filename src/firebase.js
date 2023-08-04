
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { toast } from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBWBfR19jYnMGrqm0hpHWcaEE2byjl1wXQ",
    authDomain: "lf8056academy.firebaseapp.com",
    projectId: "lf8056academy",
    storageBucket: "lf8056academy.appspot.com",
    messagingSenderId: "798569746757",
    appId: "1:798569746757:web:2ec89d6a5e98fbd908ee2c",
    databaseURL: "https://lf8056academy-default-rtdb.firebaseio.com/"

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

export const onScormChange = async (scormValues) => {


    try {
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const lessonCode = scormValues.lessonCode;
        const scormId = scormValues.key;

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
                    scormId: scormId,
                    lessonCode: lessonCode,
                    [scormId]: scormValues.progress,
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