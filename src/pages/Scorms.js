import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import VideoPlayer from "../component/VideoPlayer";

export default function Scorms() {
    const location = useLocation();
    const { scorms } = location.state || {}; // Varsa state, yoksa boş bir obje

    const [scormId, setScormId] = useState("");
    const [scorm, setScorm] = useState({});
    

    const handleNavLinkClick = (scormId) => {
        setScormId(scormId);
        const scormValue = {
            key: scormId,
            url: scorms[scormId].url,
            name: scorms[scormId].name,
            lessonCode: scorms[scormId].lessonCode
        }
        setScorm(scormValue);
    };

    return (
        <>
            <Container>
                <Row>
                    <Col
                        className="col-md-3"
                    >
                        <Nav
                            vertical
                            pills
                        >
                            {Object.keys(scorms).map((key) => {
                                const value = scorms[key];
                                return (
                                    <NavItem key={key} >
                                        <NavLink
                                            href="#"
                                            onClick={() => handleNavLinkClick(key)}
                                            className={scormId === key ? "active" : ""}
                                        >
                                            {value.name}
                                        </NavLink>
                                    </NavItem>
                                )
                            })}

                        </Nav>
                    </Col>
                    <Col
                        className="col-md-9"
                    >
                       <VideoPlayer scormData={scorm}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
