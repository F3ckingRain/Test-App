import React, {useState} from 'react'
import { useAppDispatch } from '../hooks/redux';

import { userLogin, userQuit } from '../store/reducers/ActionCreators'

interface ILogin {
    login: string;
    password: string
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const [loginState, setLoginState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const answer = {login: 'admin', password: 'admin'}

    const click = (obj: ILogin) => {
        if (obj.login === loginState && obj.password === passwordState) {
            return userLogin(dispatch)
        }
        return userQuit(dispatch)
        
    }
  return (
    <div className='login'>
        <input placeholder='Логин' type='text' onChange={(e) => setLoginState(e.target.value)}></input>
        <input placeholder='Пароль' type='password' onChange={(e) => setPasswordState(e.target.value)}></input>
        <button onClick={() => click(answer)}>Войти</button>
    </div>
  )
}
