import React from 'react';
import {Routes, Route,  Navigate} from 'react-router-dom'
import { useAppSelector } from './hooks/redux';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import './App.scss'

function App() {
  const isAuth = useAppSelector(state => state.reducer.isAuth)
    return (
        <Routes>
          {isAuth ? ( <Route path = '/' element={<UsersPage/>}/>) : (<Route path = '/login' element={<LoginPage/>}/>)}
          <Route path = '*' element= {isAuth ? (<Navigate replace to = '/'/>) : (<Navigate replace to = '/login'/>)}/>
        </Routes>
    )
}

export default App;
