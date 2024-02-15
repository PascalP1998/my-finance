import {useContext} from 'react';
import { UserContext } from '../UserContext';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

export default function LoginPage() {

    const { user, setUser } = useContext(UserContext);

    async function handleLogout() {
        setUser(null);
        await axios.get('/logout');
    }

    function LogoutButton() {
        return (
            <div className="max-w-md mx-auto mt-20 text-text grow mx-auto">
                <button onClick={handleLogout} className="w-full negative my-2 text-text">Ausloggen</button>
            </div>
        )
    }
    
    return (
        <>
            {user ? <LogoutButton /> : <LoginForm />}
        </>
    )
}