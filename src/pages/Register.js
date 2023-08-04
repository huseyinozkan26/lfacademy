import { useState } from 'react'
import { register } from '../firebase';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from 'react-redux';
import {login as loginHandle} from "../store/auth"


export default function Register() {
    const dispath = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(' ')

    const handleSubmit = async e => {
        e.preventDefault()
        const user = await register(email, password);
        dispath(loginHandle(user))
        console.log(user)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
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
                        Email
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
                        Password
                    </Label>
                </FormGroup>
                {' '}
                <Button
                    disabled={!email || !password}
                >
                    Kayıt Ol
                </Button>
            </Form>
        </div>
    )
}
