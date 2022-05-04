import React, {FC} from 'react'
import { IUser } from '../models/IUser'

interface UserItemProps {
    user: IUser;
    remove: (user: IUser) => void
    update: (user: IUser) => void
}


export const UserItem:FC<UserItemProps> = ({user, remove, update}) => {

  const handleRemove = (event: React.MouseEvent)  => {
    event.stopPropagation()
    remove(user)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const name = prompt('Введите имя') || ''
    const email = prompt('Введите email') || ''
    update({...user , name, email})
  }

  return (
    <div className='userItem'>
        {user.id}. {user.name}. {user.email}
        <button className='btn' onClick={handleRemove}>Удалить</button>
        <br></br>
        <button className='btn' onClick={handleUpdate}>Редактировать</button>
    </div>
  )
}
