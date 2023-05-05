import { createContext, useState } from "react";


export const FirebaseContext = createContext(null)
/*Export auth context likes loggedIn usernames*/
export const AuthContext = createContext(null)

/*Export like component context */
export default function Context ({children}) {
    const [user, setUser] = useState(null)

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}