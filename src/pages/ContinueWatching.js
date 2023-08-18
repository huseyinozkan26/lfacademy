import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge, ListGroup } from "reactstrap";
import { Link } from 'react-router-dom';
import { getUserData } from "../firebase";

export default function ContinueWatching() {
    const { user } = useSelector((state) => state.auth);
    const [userValues, setUserValues] = useState({});
    const [eduValues, setEduValues] = useState({});
    useEffect(() => {
        // getUserData fonksiyonunu çağırarak userValues state'ini güncelle
        getUserData(user.uid)
            .then((promiseResult) => {
                setUserValues({ ...promiseResult });
                if (userValues.scormValues) {
                    setEduValues(userValues.scormValues);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
    return (
        <>
            <h5>Başladığım Eğitimler</h5>
            <ListGroup>

                {
                    Object.keys(eduValues).map((key) => {
                     
                        var totalProcess = 0;
                        var sayac = 0;
                        Object.keys(eduValues[key]).map((keys) => {
                            totalProcess = eduValues[key][keys].progress;
                            sayac++;
                        })
                        return (
                            <Link 
                            className="list-group-item"
                            key={key}
                            >
                                   {key}  | <Badge color="primary">%{((totalProcess*100) / sayac).toFixed(2)} tamamlandı</Badge>
                            </Link>  
                        )
                    })
                }
            </ListGroup>
        </>
    )
}