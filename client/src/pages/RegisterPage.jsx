import axios from 'axios';
import {useState} from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {

    // Zustandsvariablen für Name, E-Mail und Passwort
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Funktion zum Registrieren eines neuen Benutzers
    /*async function registerUser(ev) {
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
    }*/
    
    return (
        <div className="flex flex-col grow items-center">
            <div className="mt-20 text-text mx-auto">
                <h1>Registrieren</h1>
                <form className="max-w-md mx-auto text-secondary">
                    <input type="text" placeholder="Benutzername"
                        value={name}
                        onChange={ev => setName(ev.target.value)} disabled/>
                    <input type="email" placeholder="deine@email.de" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} disabled/>
                    <input type="password" placeholder="Passwort" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} disabled/>
                    <button className="primary w-full my-2 text-text">Registrieren</button>
                </form>
                <span>Schon registriert? <Link className="border-b-2 border-primary hover:text-primary hover:border-white" to={"/login"}>Hier anmelden</Link></span>
            </div>
            <div className="bg-secondary p-4 rounded-md my-4 text-center flex flex-col items-center w-full md:w-1/4">
                <div className="p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                    </svg>
                </div>
                <span>Das ist ein Demo-Projekt, demnach werden aktuell keine neuen Nutzer registriert. Bitte <Link className="border-b-2 border-primary hover:text-primary hover:border-white" to={"/login"}>loggen Sie sich</Link>, wenn Sie die Demo ausprobieren möchten, mit folgenden Daten ein:</span>
                <ul className="list-disc text-left">
                    <li>E-Mail: max.mustermann@email.com</li>
                    <li>Passwort: 1234</li>
                </ul>
            </div>
        </div>
    )
}