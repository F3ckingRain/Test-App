import React, {ChangeEventHandler, FC} from 'react';
import s from './UsersPageContainer.module.scss'
import CustomInput from "../../UIkit/CustomInput/CustomInput";

interface UserHeaderProps  {
    createHandler: () => void,
    searchQuery: string,
    exitHandler: () => void,
    queryHandler: ChangeEventHandler<HTMLInputElement>
}

const UserHeader:FC<UserHeaderProps> = ({searchQuery, createHandler, exitHandler, queryHandler}) => {
    return (
        <div className={s.header}>
            <button className={s.btn} onClick={createHandler}>Добавить пользователя</button>
            <CustomInput type='text' placeholder='Поиск ...' value={searchQuery} changeHandler={queryHandler}/>
            <button className={s.btn} onClick={exitHandler}>Выйти</button>
        </div>
    );
};

export default UserHeader;