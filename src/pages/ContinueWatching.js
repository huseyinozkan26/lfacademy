import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";
import { getUserData } from "../firebase";

export default function ContinueWatching(){
    const { user } = useSelector((state) => state.auth);
    const [userValues, setUserValues] = useState({});
    const [eduValues, setEduValues] = useState({});
    useEffect(() => {
        // getUserData fonksiyonunu çağırarak userValues state'ini güncelle
        getUserData(user.uid)
          .then((promiseResult) => {
            setUserValues({ ...promiseResult });
            if(userValues.scormValues){
                Object.keys(userValues.scormValues).map((keys)=>{
                    setEduValues(userValues.scormValues[keys]);
                    return true;
                })
            }
          })
          .catch((error) => {
            console.error(error);
          },[]);
      }); 
    return(
        <>
        <h5>Başladığım Eğitimler</h5>
        <ul>

        
        {
            Object.keys(eduValues).map((key)=>{
                return(
                    <li key={key}>{eduValues[key].name}
                    <Badge
                    color="primary"
                    pils
                    >    %{(eduValues[key].progress*100).toFixed(2)} tamamlandı</Badge>
                    </li>
                )
            })
        }
        </ul>
        </>
    )
}