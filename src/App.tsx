import React from 'react';
import {Routes, Route,  Navigate} from 'react-router-dom'
import { useAppSelector } from './hooks/redux';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import './styles/styles.css'

function App() {
  const isAuth = useAppSelector(state => state.reducer.isAuth)
    return (
        <Routes>
          {isAuth ? ( <Route path = '/' element={<Users/>}/>) : (<Route path = '/login' element={<Login/>}/>)}
          <Route path = '*' element= {isAuth ? (<Navigate replace to = '/'/>) : (<Navigate replace to = '/login'/>)}/>
        </Routes>
    )
}

export default App;
