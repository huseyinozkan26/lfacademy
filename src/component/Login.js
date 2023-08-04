import { Form, FormGroup, Input, Button, Label, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { signIn,logOut } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginHandle, logout as logoutHandle } from "../store/auth"

export default function Login() {
    const dispath = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(' ')

    const handleSubmit = async e => {
        e.preventDefault()
        const user = await signIn(email, password);
        if (user) {
            dispath(loginHandle(user))
        }
    }

    const handleLogout = async e => {
        e.preventDefault()
        await logOut()
        dispath(logoutHandle())
    }

    const { user } = useSelector(state => state.auth)

    if (user) {
        return (
            <>
                <DropdownToggle nav caret className='btn btn-default'>
                    {(user.displayName) ? user.displayName : user.email}
                </DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem>
                        <Link className='nav-link' to="/profile">Profil</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem 
                    className='btn btn-danger'
                    onClick={handleLogout}
                    >
                        Çıkış Yap
                    </DropdownItem>
                </DropdownMenu>
            </>
        )
    } else {


        return (
            <>

                <DropdownToggle nav caret className='btn btn-default'>
                    Giriş Yap
                </DropdownToggle>
                <DropdownMenu end>

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
                        <FormGroup>
                            <Button
                                color='warning'
                                disabled={!email || !password}
                            >
                                Giriş Yap
                            </Button>
                        </FormGroup>
                    </Form>


                    <DropdownItem divider />
                    <DropdownItem>
                        <Link className='nav-link' to="/register">Kayıt Ol</Link>
                    </DropdownItem>
                </DropdownMenu>
            </>
        )
    }

}