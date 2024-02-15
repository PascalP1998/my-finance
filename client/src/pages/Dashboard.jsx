/* eslint-disable react/no-unescaped-entities */
import { UserContext } from "../UserContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from 'axios';
import BudgetView from "../components/BudgetView";

export default function Dashboard() {

    const {user} = useContext(UserContext);

    //const [bankname, setBankname] = useState('');
    const bankname = useRef('');
    const [isNew, setIsNew] = useState(true);
    const [budgetviews, setBudgetViews] = useState('');

    function Greetings() {
        if (user) {
            return <span>Willkommen auf deinem Dashboard, <strong>{user.name}</strong>! </span>
        } else {
            return (
                <div className="flex flex-col">
                    <span>Bitte logge dich erst einmal ein oder registriere dich, wenn du neu auf der Seite bist!</span>
                    <Link to="/login"><button className="w-1/4 primary my-2 text-text">Login</button></Link>
                    <Link to="/register"><button className="w-1/4 primary my-2 text-text">Registrieren</button></Link>
                </div>
            )
        }
    }

    function CreateBudgetViews() {
        const budgetViewComponents = [];
        for (let i = 0; i < budgetviews.length; i++) {
            console.log(budgetviews[i]);
            budgetViewComponents.push(<BudgetView bankname={budgetviews[i].bankname} />)
        }
        return budgetViewComponents;
    }


    useEffect(() => {
        async function getBudgetViews() {
            const user_id = user._id;
            const budgetviews = await axios.post("/getbudgetviews", {user_id});
            setBudgetViews(budgetviews.data);
        }
        getBudgetViews();
    }, [])


    async function newBudgetView(ev) {
        ev.preventDefault();
        const user_id = user._id;
        const bankname_value = bankname.current.value;
        try {
            await axios.post('/newbudgetview', { user_id, bankname: bankname_value });
            alert("Budgetblick erfolgreich eingerichtet!");
            setIsNew(false);
        } catch (error) {
            alert("Budgetblick konnte nicht eingerichtet werden!");
        }
    }

    function SetupAccountInfo() {
        if (user && isNew) {
            return (
                <>
                    <h2>Richte deinen ersten <strong>Budgetblick</strong> ein!</h2>
                    <span className="info">Info: Mit "Budgetblick" bezeichnen wir die Budget-Übersicht zu einem bestimmten Bankkonto. Keine Sorge, du richtest kein neues Bankkonto ein, immerhin sind wir nur für eine Budgetübersicht hier! :)</span>
                    <form className="mt-10 max-w-md mx-auto text-secondary" onSubmit={newBudgetView}>
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
            <SetupAccountInfo/>
            <CreateBudgetViews/>
        </div>
    )
}