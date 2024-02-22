/* eslint-disable react/no-unescaped-entities */
import { UserContext } from "../UserContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from 'axios';
import BudgetView from "../components/BudgetView";

export default function Dashboard() {

    const {user, setUser} = useContext(UserContext);

    const bankname = useRef('');

    const [budgetviews, setBudgetViews] = useState([]);

    const [renderForm, setRenderForm] = useState(false);

    const handleBankviewDeletion = () => {
        getBudgetviews();
    };

    async function getBudgetviews() {
        const user_id = user._id;
        try {
            const budgetviewsDoc = await axios.post("/getbudgetviews", {user_id});
            setBudgetViews(budgetviewsDoc.data);
                
        } catch(error) {
            console.log("Error fetching budgetviews Doc. Maybe the user is not logged in?")
        }
    }

    useEffect(() => {
        getBudgetviews();
        console.log(user.isNewUser);
    }, [])

    function Greetings() {
        if (user) {
            return (
                <div className="bg-secondary p-4 rounded-md my-4 text-center w-full md:w-1/3">
                    <span>Willkommen auf deinem Dashboard, <strong>{user.name}</strong>!</span>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col bg-secondary p-4 rounded-md my-4 text-center md:w-1/4 w-1/2">
                    <span>Bitte logge dich erst einmal ein oder registriere dich, wenn du neu auf der Seite bist!</span>
                    <Link to="/login"><button className="w-full primary my-2 text-text">Login</button></Link>
                    <Link to="/register"><button className="w-full primary my-2 text-text">Registrieren</button></Link>
                </div>
            )
        }
    }

    async function newBudgetView(ev) {
        ev.preventDefault();
        const bankname_value = bankname.current.value;
        const user_id = user._id;
        try {
            await axios.post('/addbudgetview', { user_id, bankname: bankname_value});
            const userInfo = await axios.post("/setusernotnew", {user_id});
            setUser(userInfo.data);
            getBudgetviews();
            alert("Ersten Budgetblick erfolgreich eingerichtet!");
        } catch (error) {
            alert("Erster Budgetblick konnte nicht eingerichtet werden!");
        }
    }

    async function addBudgetView(ev) {
        ev.preventDefault();
        const bankname_value = bankname.current.value;
        const user_id = user._id;
        try {
            await axios.post('/addbudgetview', { user_id, bankname: bankname_value});
            getBudgetviews();
            alert("Budgetblick erfolgreich hinzugefügt!");
        } catch (error) {
            alert("Budgetblick konnte nicht hinzugefügt werden!");
        }
    }

    function SetupAccountInfo() {
        if (user && user.isNewUser) {
            return (
                <div className="bg-secondary p-4 rounded-md my-4 text-center w-full md:w-1/3">
                    <h2>Richte deinen ersten <strong>Budgetblick</strong> ein!</h2>
                    <span className="info">Info: Mit "Budgetblick" bezeichnen wir die Budget-Übersicht zu einem bestimmten Bankkonto. Keine Sorge, du richtest kein neues Bankkonto ein, immerhin sind wir nur für eine Budgetübersicht hier! :)</span>
                    <form className="mt-10 max-w-md mx-auto text-secondary" onSubmit={newBudgetView}>
                        <input type="text" ref={bankname} placeholder="Name der Bank oder Kategorie (wie 'Tagesgeldkonto')"/>
                        <button className="primary w-full my-2 text-text">Budgetblick einrichten</button>
                    </form>
                </div>
            )
        } else if (user && !user.isNewUser) {
            return null;
        }   
    }

    function AddAccountInfo() {
        if (renderForm) {
            return (
                <div className="bg-secondary p-4 rounded-md my-4 text-center">
                    <form className="max-w-md mx-auto text-secondary" onSubmit={addBudgetView}>
                        <input type="text" ref={bankname} placeholder="Name der Bank oder Kategorie (wie 'Tagesgeldkonto')"/>
                        <button className="primary w-full my-2 text-text">Budgetblick einrichten</button>
                    </form>
                </div>
            )
        } else {
            return null;
        }
    }

    function CreateBudgetviews() {
        const budgetviewElements = []
        
        for (let i = 0; i < budgetviews.length; i++) {
            budgetviewElements.push(<BudgetView key={budgetviews[i]._id} budgetview={budgetviews[i]} onDeletion={handleBankviewDeletion}/>)
        }
        return (
            <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-8 mt-10 md:w-3/4 justify-evenly">
                {budgetviewElements}
            </div>);
    }

    function AddAccountInfoButton() {
        if (user && !user.isNewUser) {
            return (
                <div>
                    <button className="text-primary hover:text-text flex items-center" onClick={() => {if (renderForm) { setRenderForm(false); } else { setRenderForm(true); }}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clipRule="evenodd" />
                            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                        <span>Budgetblick hinzufügen</span>
                    </button>
                </div>
            )
        }
    }

    return (
        <div className="mt-20 grow mx-auto flex flex-col items-center w-full">
            <h1>Dashboard</h1>
            <Greetings/>
            <AddAccountInfoButton/>
            <AddAccountInfo/>
            <SetupAccountInfo/>
            <CreateBudgetviews/>
        </div>
    )
}