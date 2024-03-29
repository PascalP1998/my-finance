import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import axios from "axios";
import { UserContextProvider } from './UserContext';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';

axios.defaults.baseURL="https://my-finance-qcx8.onrender.com";

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
