import type { ReactNode } from "react";
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { AuthAPI } from '../APIs/auth';
import { createContext, useState, useContext, useEffect } from "react";
import { LogOut } from "lucide-react";

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
           
            setIsAuth(true);
            setUser(res.data.user);
            
            Cookie.set('token', res.data.user.token, {
                expires: 1/24, 
                secure: isProduction,
                sameSite: 'Strict' 
            });

            Cookie.set('user', JSON.stringify(res.data.user), {
                expires: 1/24, 
                secure: isProduction,
                sameSite: 'Strict' 
            });

            toast.success('Bienvenido, ' + res.data.user.displayName, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err : any) {
            console.log("Login error:", err);
            toast.error(err.message || "Error al iniciar sesión ❌", { 
                position: "top-right"
            });
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            toast.success('¡Nos vemos! ' + user?.displayName, {
                icon : <LogOut className='text-green-600 w-5 h-5' />,
                position: "top-right",
                autoClose: 3000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            setTimeout(() => {
                ['token', 'user'].forEach(name => Cookie.remove(name, { path: '/' }));
                setIsAuth(false);
                setUser(null);
            }, 1000);

        } catch (err : any) {
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