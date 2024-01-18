import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/indexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import axios from "axios";
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL="http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
