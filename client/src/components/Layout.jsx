import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen bg-background p-4 font-customFont font-work_sans flex flex-col text-text">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}