import { UserContext } from "../UserContext"
import { useContext, useState, setState } from "react"
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Dashboard() {

    const {user} = useContext(UserContext);

    //const [bankname, setBankname] = useState('');
    const bankname = useRef('');
    const [isNew, setIsNew] = useState(true);

    function Greetings() {
        if (user) {
            return <span>Willkommen auf deinem Dashboard, <strong>{user.name}</strong>! </span>
        } else {
            return (
                <div>
                    <span>Bitte logge dich erst einmal ein oder registriere dich, wenn du neu auf der Seite bist!</span>
                    <button className="w-full primary my-2 text-text"><Link to="/login">Login</Link></button>
                    <button className="w-full primary my-2 text-text"><Link to="/register">Registrieren</Link></button>
                </div>
            )
        }
    }

    async function handleBudgetView(ev) {
        ev.preventDefault();

        /*try {
            const bankInfo = await axios.post('/login', { name, email, password });

            // Setze den Benutzer im Kontext
            setUser(userInfo.data);

            alert("Budgetblick erfolgreich eingerichtet!");
        } catch (error) {
            alert("Budgetblick konnte nicht eingerichtet werden!");
        }*/
        alert(bankname.current.value);
    }

    function SetupAccountInfo(isNew) {
        if (isNew) {
            return (
                <>
                    <h2>Richte deinen ersten <strong>Budgetblick</strong> ein!</h2>
                    <span className="info">Info: Mit "Budgetblick" bezeichnen wir die Budget-Übersicht zu einem bestimmten Bankkonto. Keine Sorge, du richtest kein neues Bankkonto ein, immerhin sind wir nur für eine Budgetübersicht hier! :)</span>
                    <form className="mt-10 max-w-md mx-auto text-secondary" onSubmit={handleBudgetView}>
                        <input type="text" ref={bankname} placeholder="Name der Bank oder Kategorie (wie 'Tagesgeldkonto')"/>
                        <button className="primary w-full my-2 text-text">Budgetblick einrichten</button>
                    </form>
                </>
            )
        }   
    }

    return (
        <div className="mt-20 grow max-w-4xl mx-auto">
            <h1>Dashboard</h1>
            <div className="bg-secondary p-4 rounded-md my-4 text-center">
                <Greetings />
            </div>
            <div className="bg-secondary p-4 rounded-md my-4 text-center">
                <SetupAccountInfo />
            </div>
        </div>
    )
}