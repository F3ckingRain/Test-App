import React, {ChangeEvent, useEffect, useState} from 'react'
import { useAppDispatch } from '../../hooks/redux';

import { userLogin, userQuit } from '../../store/reducers/ActionCreators'
import s from './LoginPage.module.scss'
import CustomInput from "../../UIkit/CustomInput/CustomInput";

interface ILogin {
    login: string;
    password: string
}

export const LoginPage = () => {

    const dispatch = useAppDispatch()

    const [loginState, setLoginState] = useState<string>('')
    const [passwordState, setPasswordState] = useState<string>('')
    const [userState, setUserState] = useState<ILogin>({login: loginState, password: passwordState})
    const answer = {login: 'admin', password: 'admin'}

    useEffect(() => {
        setUserState({login: loginState, password: passwordState})
    },[loginState,passwordState])

    const click = (obj: ILogin = userState)=> {
        if (!obj.login || !obj.password) return
        if (obj.login === answer.login && obj.password === answer.password) {
            return userLogin(dispatch)
        }
        return userQuit(dispatch)
    }
    const enterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            click(userState)
        }
    }
    const loginChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginState(e.target?.value)
    }
    const passwordChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordState(e.target?.value)
    }
  return (
      <div className={s.page}>
          <div className={s.login} onKeyDown={(e) => enterPress(e)}>
              <CustomInput type='text' placeholder='Логин' value={loginState} changeHandler={loginChangeHandler} />
              <CustomInput type='password' placeholder='Пароль' value={passwordState} changeHandler={passwordChangeHandler} />
              <button className={s.login__btn} onClick={() => click(userState)}>Войти</button>
          </div>
      </div>

  )
}
