import { useEffect, useState } from "react";
import { Card, Row, CardBody, Nav, NavItem, NavLink, CardFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { getEducations } from "../firebase";

export default function Lessons() {
    const [categorie, setCategorie] = useState(""); // Başlangıçta "" olarak ayarlayabilirsiniz.
    const [lessonValues, setLessonsValues] = useState({});
    const [lessonCards, setLessonCards] = useState({});

    useEffect(() => {
        getEducations(categorie)
            .then((promiseResult) => {
                setLessonsValues({ ...promiseResult });
                Object.keys(lessonValues).map((key) => {
                    const value = lessonValues[key];
                    if (value.shotCode === categorie) {
                        if (value.lessons) {
                            setLessonCards(value.lessons);
                        } else {
                            setLessonCards({});
                        }
                    }
                })

            })
            .catch((error) => {
                console.log(error.message);
                //toast.error(error.message);
            });
    }, [categorie]);

    const handleNavLinkClick = (shotCode) => {
        // NavLink tıklandığında çağrılacak işlev.
        // Seçilen shotCode'u state içinde güncelliyoruz.
        setCategorie(shotCode);

    };

    return (
        <>
            <Nav tabs>
                {Object.keys(lessonValues).map((key) => {
                    const value = lessonValues[key];
                    return (
                        <NavItem key={key}>
                            <NavLink
                                className={categorie === value.shotCode ? "active" : ""}
                                onClick={() => handleNavLinkClick(value.shotCode)}
                                href="#"
                            >
                                {value.name}
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
            <Row>
                {Object.keys(lessonCards).map((key) => {
                    const cardValue = lessonCards[key];
                    //console.log(cardValue.scorms);
                    // cardValue.scorms objesinin anahtarlarını elde ediyoruz
                    if (cardValue.scorms) {
                        Object.keys(cardValue.scorms).map((scormKey) => {
                            const scorm = cardValue.scorms[scormKey];
                            scorm.lessonCode = cardValue.lessonCode; // Yeni alanı ekliyoruz
                        });
                    }
                    return (
                        <div
                            key={key}
                            className="col-md-4"
                        >
                            <Card>
                                <img
                                    alt="Sample"
                                    src={cardValue.thumbnail ? cardValue.thumbnail : "http://lf8056.com.tr/assets/fotolar/lf_akademi.jpeg"}
                                />

                                <CardBody>
                                    <h3>{cardValue.name}</h3>
                                    <p>{cardValue.desc}</p>
                                </CardBody>
                                <CardFooter>
                                    <Link
                                        className="btn btn-warning"
                                        to="/scorms"
                                        state={{ scorms: cardValue.scorms }}
                                    >Ders Git</Link>
                                </CardFooter>
                            </Card>

                        </div>
                    )
                })}

            </Row>
        </>
    );
}