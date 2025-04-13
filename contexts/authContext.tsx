import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [user, setUser] = useState<UserType>(null)
    const router = useRouter()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) =>{
            if(firebaseUser){
                setUser({
                    uid: firebaseUser?.uid,
                    email: firebaseUser?.email,
                    name: firebaseUser?.displayName
                });
                router.replace('/(tabs)')
            }else{
                // no user
                setUser(null);
                router.replace("/(auth)/welcome")
            }
        });

        return ()=> unsub();

    }, []);

    const login = async (email: string, password: string) =>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return{success: true}
        }catch (error: any){
            let msg = error.message
            return{success: false, msg}
        }
    }
    const register = async (email: string, password: string, name: string) =>{
        try {
            let respone = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(firestore, "users", respone?.user?.uid),{
                name,
                email,
                uid: respone?.user?.uid
            })
            return{success: true}
        }catch (error: any){
            let msg = error.message
            return{success: false, msg}
        }
    }
    const updateUserData = async (uid: string)=> {
        try {
            const docRef = doc(firestore, "users", uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const data = docSnap.data()
                const userData: UserType = {
                    uid: data?.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser({...userData})
            }
        }catch (error: any){
            let msg = error.message
            //return{success: false, msg}
            console.log('error: ', error)
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut()
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    const contextValue: AuthContextType ={
        user,
        setUser,
        login,
        register,
        updateUserData,
        signOut,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = ():AuthContextType => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be wrapped inside AuthProvider")
    }
    return context
}