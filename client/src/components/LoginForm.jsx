import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';

export default function LoginForm() {

    // Zustandsvariablen für E-Mail, Passwort und Umleitung nach erfolgreichem Login
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    // Verwende den useContext-Hook, um auf den Benutzerkontext zuzugreifen
    const { setUser } = useContext(UserContext);

    async function loginUser(ev) {
        ev.preventDefault();
        try {
            // Sende eine POST-Anfrage an den Server, um den Benutzer einzuloggen
            const userInfo = await axios.post('/login', { name, email, password });

            // Setze den Benutzer im Kontext
            setUser(userInfo.data);

            // Zeige eine Erfolgsmeldung an und leite um
            alert("Erfolgreich eingeloggt!");
            setRedirect(true);
        } catch (error) {
            alert("Fehler beim Einloggen!");
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-20 text-text grow mx-auto" key="form">
            <h1>Login</h1>
            <form className="max-w-md mx-auto text-secondary" onSubmit={loginUser}>
                <input type="email" placeholder="deine@email.de"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="Passwort"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button className="primary w-full my-2 text-text">Login</button>
            </form>
            <span>Noch kein Account? <Link className="border-b-2 border-primary hover:text-primary hover:border-white" to={"/register"}>Hier registrieren</Link></span>
        </div>
    )
}   