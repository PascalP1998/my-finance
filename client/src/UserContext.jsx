import {createContext, useState} from "react";

export const UserContext = createContext({});

// Definiere einen React-Komponenten-Provider für den erstellten Kontext
// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    // Rendere den Provider mit dem aktuellen Benutzerzustand und der setUser-Funktion
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}