/* eslint-disable react/no-unescaped-entities */
import { UserContext } from "../UserContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from 'axios';
import BudgetView from "../components/BudgetView";

export default function Dashboard() {

    const {user} = useContext(UserContext);

    const bankname = useRef('');

    const [budgetviews, setBudgetViews] = useState([]);

    useEffect(() => {
        async function getBudgetviews() {
            const user_id = user._id;
            try {
                const budgetviewsDoc = await axios.post("/getbudgetviews", {user_id});
                setBudgetViews(budgetviewsDoc.data);
                    
            } catch(error) {
                console.log("Error fetching budgetviews Doc. Maybe the user is not logged in?")
            }
        }
        getBudgetviews();
    }, [])

    function Greetings() {
        if (user) {
            return (
                <div className="bg-secondary p-4 rounded-md my-4 text-center w-1/3">
                    <span>Willkommen auf deinem Dashboard, <strong>{user.name}</strong>!</span>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col bg-secondary p-4 rounded-md my-4 text-center w-1/2">
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
            await axios.post("/setusernotnew", {user_id});
            alert("Ersten Budgetblick erfolgreich eingerichtet!");
        } catch (error) {
            alert("Erster Budgetblick konnte nicht eingerichtet werden!");
        }
    }

    function SetupAccountInfo() {
        if (user && user.isNewUser) {
            return (
                <div className="bg-secondary p-4 rounded-md my-4 text-center">
                    <h2>Richte deinen ersten <strong>Budgetblick</strong> ein!</h2>
                    <span className="info">Info: Mit "Budgetblick" bezeichnen wir die Budget-Übersicht zu einem bestimmten Bankkonto. Keine Sorge, du richtest kein neues Bankkonto ein, immerhin sind wir nur für eine Budgetübersicht hier! :)</span>
                    <form className="mt-10 max-w-md mx-auto text-secondary" onSubmit={newBudgetView}>
                        <input type="text" ref={bankname} placeholder="Name der Bank oder Kategorie (wie 'Tagesgeldkonto')"/>
                        <button className="primary w-full my-2 text-text">Budgetblick einrichten</button>
                    </form>
                </div>
            )
        } else {
            return (<></>)
        }   
    }

    function CreateBudgetviews() {
        const budgetviewElements = []
        for (let i = 0; i < budgetviews.length; i++) {
            budgetviewElements.push(<BudgetView key={budgetviews[i]._id} budgetview={budgetviews[i]}/>)
        }
        return (
            <div className="flex flex-row flex-wrap justify-center">
                {budgetviewElements}
            </div>);
    }

    return (
        <div className="mt-20 grow mx-auto flex flex-col items-center">
            <h1>Dashboard</h1>
            <Greetings/>
            <SetupAccountInfo />
            <CreateBudgetviews/>
        </div>
    )
}