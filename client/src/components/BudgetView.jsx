/* eslint-disable react/prop-types */
import { UserContext } from "../UserContext"
import { useContext, useEffect, useState } from "react"
import { useRef } from "react";
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function BudgetView({budgetview, onDeletion}) {

    const {user} = useContext(UserContext);

    const date = useRef('');
    const amount = useRef('');
    const desc = useRef('');

    const [transactionitems, setTransactionItems] = useState([]);

    const handleTransactionItemDeletion = () => {
        getTransactionItems();
    };

    const handleClick = () => {
        amount.current.reset();
        desc.current.reset();
    };

    async function getTransactionItems() {
        const bv_id = budgetview._id;
        try {
            const transactionItemDoc = await axios.post("/gettransactionitems", {bv_id});
            const transactionItemDocSorted = transactionItemDoc.data.sort((a,b) => new Date(a.date) - new Date(b.date));
            setTransactionItems(transactionItemDocSorted);
                
        } catch(error) {
            console.log("Error fetching transactionitems Doc. Maybe the user is not logged in?")
        }
    }

    useEffect(() => {
        getTransactionItems()
    }, [])

    async function deleteBankview(ev) {
        ev.preventDefault();
        const proceed = confirm(`Möchtest du ${budgetview.bankname} wirklich löschen?`);
        if (proceed) {
            const budgetview_id = budgetview._id;
            try {
                await axios.post("/deletebudgetview", {budgetview_id});
                alert(`${budgetview.bankname} wurde gelöscht!`);
                onDeletion();
            } catch (error) {
                alert(`${budgetview.bankname} konnte nicht gelöscht werden!`);
            }
        } else {
            alert(`${budgetview.bankname} wurde nicht gelöscht!`);
        }
    }

    async function addTransactionItem(ev) {
        ev.preventDefault();
        const date_value = date.current.value;
        const amount_value = amount.current.value;
        const desc_value = desc.current.value;
        const bv_id = budgetview._id;
        try {
            await axios.post('/addtransactionitem', { bv_id, date: date_value, amnt: amount_value, desc: desc_value});
            getTransactionItems();
        } catch (error) {
            alert("Transaktions-Item konnte nicht hinzugefügt werden!");
        }
    }

    function SaldoRevenue() {

        const revenue = transactionitems.map(obj => obj.amnt);
        let sum = 0;

        revenue.forEach(num => {
            sum += num;
        })

        const number = (Math.round((budgetview.startSaldo + sum) * 100) / 100).toFixed(2)
        sum = (Math.round(sum * 100) / 100).toFixed(2)

        let styles = "";
        if (number < 0) {
            styles = "px-3 py-1 border border-accent rounded-md bg-zinc-100 text-red-700";
        } else {
            styles = "px-3 py-1 border border-accent rounded-md bg-zinc-100 text-neutral-950";
        }

        let styles_sum = "";
        if (sum < 0) {
            styles_sum = "px-3 py-1 border border-accent rounded-md bg-zinc-100 text-red-700";
        } else {
            styles_sum = "px-3 py-1 border border-accent rounded-md bg-zinc-100 text-neutral-950";
        }

        return (
            <div className="flex justify-between">
                <div className="p-4 flex flex-col"><span><strong>Saldo</strong></span><span className={styles}><strong>{number}&nbsp;€</strong></span></div>
                <div className="p-4 flex flex-col"><span><strong>Umsatz</strong></span><span className={styles_sum}><strong>{sum}&nbsp;€</strong></span></div>
            </div>
        )
    }

    function TransactionItem({transactionitem, onDeletion, index}) {

        async function deleteTransactionItem(ev) {
            ev.preventDefault();

            const transactionitem_id = transactionitem._id;
            try {
                await axios.post("/deletetransactionitem", {transactionitem_id});
                onDeletion();
            } catch (error) {
                console.log(error);
            }
        }


        const date = new Date(transactionitem.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        const formatDate = `${year}-${month}-${day}`;

        const number = (Math.round(transactionitem.amnt * 100) / 100).toFixed(2)

        let styles = "";
        if (transactionitem.amnt < 0) {
            styles = "border border-accent p-2 text-negative";
        } else {
            styles = "border border-accent p-2";
        }

        return(
            /*<div>
                <span className="p-4">{formatDate}</span>
                <span className="p-4">{transactionitem.amnt}€</span>
                <span className="p-4">{transactionitem.desc}</span>
            </div>*/
            <tr className="hover:bg-slate-500">
                <td className="border border-accent p-2">{index}</td>
                <td className="border border-accent p-2">{formatDate}</td>
                <td className={styles}>{number}&nbsp;€</td>
                <td className="border border-accent p-2">{transactionitem.desc}</td>
                <td className="border border-accent p-2">
                    <button className="text-negative hover:text-text" onClick={deleteTransactionItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </td>
            </tr>
        )
    }

    /*
                <ol className="list-decimal">
                    {transactionElements}
                </ol>
    */

    function CreateTransactionItems() {

        const transactionElements = []
        
        for (let i = 0; i < transactionitems.length; i++) {
            transactionElements.push(<TransactionItem key={transactionitems[i]._id} transactionitem={transactionitems[i]} onDeletion={handleTransactionItemDeletion} index={i+1}/>)
        }
        return (
            <div className="flex flex-col w-full md:flex-wrap grow">
                <table className="table-fixed border border-accent mb-5">
                    <thead>
                        <tr>
                            <th className="border border-accent p-2">#</th>
                            <th className="border border-accent p-2">Datum</th>
                            <th className="border border-accent p-2">Betrag</th>
                            <th className="border border-accent p-2">Beschreibung</th>
                            <th className="border border-accent p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionElements}
                    </tbody>
                </table>
            </div>
        )
    }

    function NewTransactionButton() {
        return (
            <form className="max-w-md mx-auto text-secondary flex gap-1" onSubmit={addTransactionItem}>
                <input type="date" ref={date} min="1970-01-01" className="border my-2 py-2 px-3 rounded-md w-1/2" required/>
                <input type="number" ref={amount} placeholder="Betrag" step=".01" required/>
                <input type="text" ref={desc} placeholder="Beschreibung" required/>
                <button onClick={handleClick} className="primary w-1/6 my-2 text-text">+</button>
            </form>
        )
    }

    return (
        <div className="bg-secondary p-4 rounded-md flex flex-col w-full md:w-1/2">
            <h2>{budgetview.bankname}</h2>
            <SaldoRevenue/>
            <CreateTransactionItems/>
            <NewTransactionButton/>
            <button className="text-negative hover:text-text mt-5" onClick={deleteBankview}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}