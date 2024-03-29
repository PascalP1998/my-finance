import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../UserContext';

export default function Header() {
    const {user} = useContext(UserContext);

    function ProfileIcon() {
        if (user) {
            console.log(user);
            return <div className="w-10 h-10 flex border-2 border-white rounded-full text-white hover:text-primary hover:border-primary"><span className="m-auto">{user.name.charAt(0)}</span></div>
        } else {
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        }
    }
    
    return (
        <header className="flex items-center justify-between text-text">
            <Link to={"/"} className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
            <span className="font-bold text-xl">My Finance</span>
            </Link>
            <div className="flex font-bold items-center gap-2">
            <Link to={'/dashboard'}><button className="primary">Dashboard</button></Link>
                <Link to={"/login"} className="hover:text-primary">
                    <ProfileIcon />
                </Link>
            </div>
        </header>
    )
}