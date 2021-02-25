import React, { Component, useState} from 'react'
import { Form, Button, Container, FormCheck } from 'react-bootstrap'
       export default ({ onRegister }) => {
            const [login, setLogin] = useState('')
            const [password1, setPassword1] = useState('')
            const [password2, setPassword2] = useState('')

            const valid = password1 === password2 && password1 && password1.length >= 8

            const style = {borderColor: valid ? "green" : "black" }

            return (
                    <Container style={{width:"500px"}}>
                <h1 className="text-center">
                    Your accaunt
                </h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label> Login</Form.Label>
                        <Form.Control type="login" value={login} placeholder="Enter login" onChange={({ target: { value } }) => setLogin(value)} />

                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password1} onChange={({ target: { value } }) => setPassword1(value)} />

                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label> Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password"  value={password2} onChange={({ target: { value } }) => setPassword2(value)}  style={style}/>
                    </Form.Group>
                   
                    <Button variant="secondary" type="submit"onClick={()=> onRegister(login, password1)} disabled={!valid}>Registr</Button>

                </Form>
            </Container>
            )
        }
// export default class Acc extends Component {
//     render() {
//         return (

                //    <div className='FormRegister'>
                //     <div><input type='text' value={login} onChange={({ target: { value } }) => setLogin(value)} placeholder='Login' /></div>
                //     <div> <input type='password' value={password1} onChange={({ target: { value } }) => setPassword1(value)} placeholder='Password' style={style} /></div>
                //     <div> <input type='password' value={password2} onChange={({ target: { value } }) => setPassword2(value)} placeholder='Password' style={style} /> </div>
                //     <button onClick={() => onRegister(login, password1)} disabled={!valid}>Register...</button>
                // </div>

 


//         )

//     }

// }