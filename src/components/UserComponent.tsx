import React, {useEffect, useMemo, useState} from 'react'
import { userAPI } from '../services/UserService'
import { userQuit, usersFilter } from '../store/reducers/ActionCreators'
import { UserItem } from './UserItem'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IUser } from '../models/IUser'

export const UserComponent = () => {
    const {data: users, error, isLoading} = userAPI.useFetchAllUsersQuery(100)
    const dispatch = useAppDispatch()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [createUser, {}] = userAPI.useCreateUserMutation()
    const [updateUser, {}] = userAPI. useUpdateUserMutation()
    const [deleteUser, {} ] = userAPI.useDeleteUserMutation()

    const searchedUsers = useMemo(() => {
      if (!searchQuery) 
        return users
      return users?.filter(user => {return user.name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())})
    }, [searchQuery, users])

    const handleCreate = async () => {
      const name = prompt('Введите имя')
      const email = prompt('Введите email')
      const id = 0
      await createUser({name, email, id, body: {name, email, id}} as IUser)
    }
    
    const handleRemove = (user: IUser) => {
      deleteUser(user)
    }

    const handleUpdate = (user: IUser) => {
      updateUser(user)
    }
    useEffect(() => {
     
    }, [searchQuery])
   
  return (
    <div className='users'>
        <button className='btn' onClick={handleCreate}>Добавить пользователя</button>
        <input value={searchQuery} type='text' placeholder='Поиск ...' onChange={(e) => setSearchQuery(e.target.value)}></input>
        <button className='exit' onClick={() => userQuit(dispatch)}>Выйти</button>
        {isLoading && <h1>Идёт загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>} 
        {searchedUsers && searchedUsers.map(user => <UserItem  remove = {handleRemove} update = {handleUpdate} key = {user.id} user = {user}/>)}
    </div>
  )
}
