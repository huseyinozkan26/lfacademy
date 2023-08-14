import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button, Card, CardBody, CardHeader } from 'reactstrap';
import { updateUser, setUserData, getUserData } from '../firebase';
import { useSelector } from 'react-redux';

export default function UpdateProfile() {
    const [formData, setFormData] = useState([
        { label: 'Ad Soyad', name: 'displayName', type: 'text', value: '' },
        { label: 'Telefon Numarası', name: 'phone', type: 'text', value: '' },
        { label: 'TC Kimlik No', name: 'tcKimlik', type: 'number', value: '' },
        { label: 'Doğum Tarihi', name: 'birthDate', type: 'date', value: '' },
        { label: 'Veli Adı', name: 'veliAdi', type: 'text', value: '' },
        { label: 'Veli E-Posta Adresi', name: 'veliMail', type: 'email', value: '' },
        { label: 'Veli Telefon Numarası', name: 'veliTelefon', type: 'text', value: '' },
    ]);

    const { user } = useSelector((state) => state.auth);
    const userData = { ...user };

    useEffect(() => {
        getUserData(userData.uid)
            .then((promiseResult) => {
                setFormData((prevData) =>
                    prevData.map((item) => {
                        if (item.name === 'displayName') {
                            return { ...item, value: userData.displayName || '' };
                        } else {
                            return { ...item, value: promiseResult[item.name] || '' };
                        }
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userData.uid]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser({ displayName: formData.find((item) => item.name === 'displayName').value });
        await setUserData(formData.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}));
    };

    return (
        <Card>
            <CardHeader>
                <h3>Kullanıcı Bilgilerini Güncelle</h3>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    {formData.map((item) => (
                        <FormGroup key={item.name} floating>
                            <Input
                                id={item.name}
                                name={item.name}
                                placeholder={item.label}
                                type={item.type}
                                value={item.value}
                                onChange={(e) =>
                                    setFormData((prevData) =>
                                        prevData.map((prevItem) =>
                                            prevItem.name === item.name ? { ...prevItem, value: e.target.value } : prevItem
                                        )
                                    )
                                }
                            />
                            <Label for={item.name}>{item.label}</Label>
                        </FormGroup>
                    ))}
                    <Button>Güncelle</Button>
                </Form>
            </CardBody>
        </Card>
    );
}
