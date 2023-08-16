import { Form, FormGroup, Input, Button, Label, Alert, Card, CardBody, CardFooter } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { signIn } from '../firebase';
import { useDispatch } from 'react-redux';
import { login as loginHandle } from "../store/auth"

export default function Login() {
    const dispath = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const user = await signIn(email, password);
        if (user) {
            dispath(loginHandle(user))
        }
    }

    return (
        <>
            <Alert color='danger'>Giriş yapmadınız</Alert>

            <Card>
                <CardBody>
                    <Form
                        className='row'
                        onSubmit={handleSubmit}
                    >
                        <FormGroup floating>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Label for="exampleEmail">
                                E-Posta
                            </Label>
                        </FormGroup>
                        {' '}
                        <FormGroup floating>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Label for="examplePassword">
                                Şifre
                            </Label>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Button
                                color='warning'
                                disabled={!email || !password}
                            >
                                Giriş Yap
                            </Button>
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter
            
                >
                    LF Akademi hesabun yok ise  <Link className='btn btn-danger' to="/register">Kayıt Ol</Link>
                </CardFooter>
            </Card>

        </>
    )
}