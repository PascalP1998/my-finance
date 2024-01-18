import axios from 'axios';
import {useState} from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {

    // Zustandsvariablen für Name, E-Mail und Passwort
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Funktion zum Registrieren eines neuen Benutzers
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            // Sende eine POST-Anfrage an den Server mit den Registrierungsdaten
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert("Registrierung erfolgreich. Sie können sich nun einloggen!");
        } catch (error) {
            alert("Etwas ist schief gelaufen, bitte versuchen Sie es noch einmal!");
        }
    }
    
    return (
        <>
            <div className="mt-20 text-text grow mx-auto">
                <h1>Registrieren</h1>
                <form className="max-w-md mx-auto text-secondary" onSubmit={registerUser}>
                    <input type="text" placeholder="Benutzername"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="deine@email.de" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Passwort" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary w-full my-2 text-text">Registrieren</button>
                </form>
                <span>Schon registriert? <Link className="border-b-2 border-primary hover:text-primary hover:border-white" to={"/login"}>Hier anmelden</Link></span>
            </div>
        </>
    )
}