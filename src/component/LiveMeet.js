import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { onLiveStart } from '../firebase';
import { Button, Row, Col, Label, Input, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { JitsiMeeting } from '@jitsi/react-sdk';

const LiveMeet = () => {
    const [roomName, setRoomName] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const focusAfterClose = true;
    const [btnActive, setBtnActive] = useState(true);

    const toggle = () => setOpen(!open);

    useEffect(() => {
        if (roomName.length > 3) {
            setBtnActive(false);
        } else {
            setBtnActive(true);
        }
    }, [roomName]);

    return (
        <>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Label className="visually-hidden" for="meetingName">
                            Ders Adı
                        </Label>
                        <Input
                            id="meetingName"
                            name="meetingName"
                            placeholder="Ders Adı"
                            type="text"
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button color="primary" onClick={toggle} disabled={btnActive}>
                            Dersi Başlat
                        </Button>
                    </Col>
                </Row>
            </Form>
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
                            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
                        }}
                        userInfo={{
                            displayName: user.displayName
                        }}
                        readyToClose={{ toggle }}
                        onApiReady={(externalApi) => {
                            onLiveStart({
                                teacher: user.displayName,
                                lesson_name: roomName,
                                active:true

                            });
                        }}
                        getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
                    />

                </ModalBody>
            </Modal>

        </>
    );
};

export default LiveMeet;
