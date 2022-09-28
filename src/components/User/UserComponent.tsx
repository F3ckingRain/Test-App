import React, {ChangeEvent, FC} from 'react';
import {IUser} from "../../models/IUser";
import s from './User.module.scss'
import CustomInput from "../../UIkit/CustomInput/CustomInput";

interface UserComponentProps {
    user: IUser,
    isRedacting: boolean
    setUserState: (user: IUser) => void
}

const UserComponent:FC<UserComponentProps> = ({user, isRedacting, setUserState}) => {
    const userNameHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const newUser = {...user, name: e.target?.value }
        setUserState(newUser)
    }
    const userMailHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const newUser = {...user, email: e.target?.value }
        setUserState(newUser)
    }
    return (
        <div className={s.userComponent}>
            {user.id}.
            {
                isRedacting
                    ? (
                        <div className={s.userComponent__inputs}>
                            <CustomInput type="text" value={user.name} changeHandler={userNameHandler}/>
                            <CustomInput type='text' value={user.email} changeHandler={userMailHandler} />
                        </div>
                    )
                    :
                    (
                        <span className={s.userItem__content}>{user.name}. {user.email}</span>
                    )
            }
        </div>
    );
};

export default UserComponent;