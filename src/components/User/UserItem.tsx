import React, {FC, useState} from 'react'
import { IUser } from '../../models/IUser'
import s from './User.module.scss'
import UserComponent from "./UserComponent";

interface UserItemProps {
    user: IUser;
    remove: (user: IUser) => void
    update: (user: IUser) => void
}


export const UserItem:FC<UserItemProps> = ({user, remove, update}) => {

    const [isRedacting, setIsRedacting] = useState<boolean>(false)
    const [userState, setUserState] = useState<IUser>(user)

  const handleRemove = (event: React.MouseEvent)  => {
    event.stopPropagation()
    remove(user)
  }

    const redactingToggle = () => {
        setIsRedacting(prevState => !prevState)
    }

  const handleUpdate = () => {
        if (!userState.email || !userState.name) return
        update({...user , name: userState.name, email:userState.email})
        redactingToggle()
  }
    const enterPressHandler = (e:React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            handleUpdate()
        }
    }

  return (
    <div className={s.userItem} onKeyDown={isRedacting ? enterPressHandler : undefined}>
        <UserComponent user={userState} isRedacting={isRedacting} setUserState={setUserState}/>
        <div className={s.btns}>
            <button className={s.btns__btn} onClick={handleRemove}>Удалить</button>
            <button className={s.btns__btn} onClick={isRedacting ? handleUpdate : redactingToggle}>
                {isRedacting ? 'Применить' : 'Редактировать'}
            </button>
        </div>
    </div>
  )
}
