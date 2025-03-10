import { createContext, useState, useEffect, useContext } from 'react'
import { auth, firestore } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const docRef = doc(firestore, 'usuarios', currentUser.uid)
                const docSnap = await getDoc(docRef)
                setUserData(docSnap.exists() ? docSnap.data() : null)
            } else {
                setUserData(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ user, userData, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
