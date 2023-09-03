import { useEffect, useState } from "react";
import { getLiveLessons } from "../firebase";
import { useSelector } from "react-redux";
import { JitsiMeeting } from '@jitsi/react-sdk';

import { ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function LiveMeet() {
    const [liveLessons, setLiveLessons] = useState([]);
    const [roomName, setRoomName] = useState('');
    const { user } = useSelector((state) => state.auth);
    const focusAfterClose = true;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        getLiveLessons()
            .then((promiseresult) => {
                setLiveLessons(promiseresult);
                console.log(promiseresult); // liveLessons yerine promiseresult kullanın
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Boş bağımlılık dizisi, yalnızca bileşen ilk kez oluşturulduğunda çalışır.

    const toggle = (room) => {
        setOpen(!open);
        if (open) {
            setRoomName('');
        } else {
            setRoomName(room);
        }
    };

    return (
        <>
            <h5>Canlı Dersler:</h5>
            <ListGroup flush>
                {Object.keys(liveLessons).map((key) => {
                    const liveLesson = liveLessons[key];
                    if (liveLesson['active']) {
                        return (
                            <ListGroupItem
                                href="#"
                                tag="a"
                                onClick={() => toggle(liveLesson["lesson_name"])} // Fonksiyon çağrısını bu şekilde değiştirin
                                key={key} // Benzersiz bir "key" ekleyin
                            >
                                {liveLesson["lesson_name"]} | Öğretmen: {liveLesson["teacher"]}
                            </ListGroupItem>
                        );
                    }

                })}
            </ListGroup>
            <Modal returnFocusAfterClose={focusAfterClose} isOpen={open} fullscreen>
                <ModalHeader toggle={toggle}>{roomName}</ModalHeader>
                <ModalBody>
                    <JitsiMeeting

                        domain={"jitsi.member.fsf.org"}
                        roomName={"lf-8056" + roomName}
                        configOverwrite={{
                            startWithAudioMuted: true,
                            disableModeratorIndicator: true,
                            startScreenSharing: true,
                            enableEmailInStats: false,
                            defaultLanguage: 'tr'
                        }}
                        interfaceConfigOverwrite={{
                            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false
                        }}
                        userInfo={{
                            displayName: user.displayName
                        }}
                        readyToClose={() => {
                            console.log("Toplantı sonlandırıldı.");
                        }

                        }
                        videoConferenceLeft={
                            () => {
                                console.log("Toplantıdan ayrıldınız.")
                            }
                        }
                        onApiReady={(externalApi) => {
                        }}
                        getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
                    />

                </ModalBody>
            </Modal>
        </>
    )
}