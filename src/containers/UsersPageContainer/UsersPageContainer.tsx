import React, {ChangeEvent, useCallback, useMemo, useState} from 'react'
import { userAPI } from '../../services/UserService'
import { userQuit } from '../../store/reducers/ActionCreators'
import { UserItem } from '../../components/User/UserItem'
import {useAppDispatch } from '../../hooks/redux'
import { IUser } from '../../models/IUser'
import UserHeader from "./UserHeader";
import s from './UsersPageContainer.module.scss'

export const UsersPageContainer = () => {
    const { data: users, error, isLoading } = userAPI.useFetchAllUsersQuery(100)
    const dispatch = useAppDispatch()
    const [ searchQuery, setSearchQuery ] = useState<string>('')
    const [ createUser, {} ] = userAPI.useCreateUserMutation()
    const [ updateUser, {} ] = userAPI.useUpdateUserMutation()
    const [ deleteUser, {} ] = userAPI.useDeleteUserMutation()

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
    const exitHandler = useCallback(() => {
         userQuit(dispatch)
    },[ dispatch ])
    const queryHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return
        setSearchQuery(e.target.value)
    },[])
  return (
      <div className={s.page}>
          <div className={s.usersContainer}>
              <UserHeader exitHandler={exitHandler} searchQuery={searchQuery} createHandler={handleCreate} queryHandler={queryHandler}/>
              {isLoading && <h1>Идёт загрузка...</h1>}
              {error && <h1>Произошла ошибка при загрузке</h1>}
              {searchedUsers && searchedUsers.map(user => <UserItem  remove = {handleRemove} update = {handleUpdate} key = {user.id} user = {user}/>)}
          </div>
      </div>
  )
}
