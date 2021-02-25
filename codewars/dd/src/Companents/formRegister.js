import React, {useState} from 'react'

export default ({onRegister}) =>{
    const [login, setLogin]         = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const valid = password1 === password2 && password1 && password1.length >=8

    const style = {borderColor: valid ? "" : "red"}

    return (
        <div className='FormRegister'>
            <div><input type='text' value={login} onChange={({target: {value}}) => setLogin(value)} placeholder='Login' /></div>
            <div> <input type='password'  value={password1} onChange={({target: {value}}) => setPassword1(value)} placeholder='Password' style={style}/></div>
            <div> <input type='password'  value={password2} onChange={({target: {value}}) => setPassword2(value)} placeholder='Password' style={style}/> </div>
            <button onClick={()=> onRegister(login, password1)} disabled={!valid}>Register...</button>
        </div>
    )
}
