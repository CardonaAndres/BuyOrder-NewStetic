import Cookie from 'js-cookie';
import { AuthAPI } from '../APIs/AuthAPI';
import type { ReactNode } from "react";
import { createContext, useState, useContext, useEffect } from "react";

const isProduction = window.location.protocol === "https:";

type AuthProviderProps = {
  children: ReactNode
}

type User = {
    cn: string;
    displayName: string;
    mail: string;
    givenName: string;
    sn: string;
    telephoneNumber: string;
}
  

type AuthContextType = {
  login: (data: { username : string, password : string }) => Promise<void>
  logout: () => Promise<void>
  isAuth: boolean
  loading: boolean
  user: User | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>({
        cn: '',
        displayName: '',
        mail: '',
        givenName: '',
        sn: '',
        telephoneNumber: ''
    })

    const login = async (userInfo: {username : string, password : string}) => {
        try {
            const res = await AuthAPI.login(userInfo);
            if(!res.success) throw new Error(res.message);
           
            // mensaje: res.data.message
            // token: res.data.user.token

            setIsAuth(true);
            setUser(res.data.user);

            Cookie.set('user', JSON.stringify(res.data.user), {
                expires: 1/24, 
                secure: isProduction,
                sameSite: 'Strict' 
            });

        } catch (err) {
            console.log("Login error:", err);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            ['token', 'user'].forEach(name => Cookie.remove(name, { path: '/' }));
            setIsAuth(false);
            setUser(null);
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        const { user, token } = Cookie.get();

        if (user && token) {
            setUser(JSON.parse(user));
            setIsAuth(true);
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isAuth,
                loading,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}