import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            if (data) {
                setUser(data.user);
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try{
            const data = await register({ username, email, password });

            if(data){
                setUser(data.user);
                }
            }catch (err){
                
            } finally {
                setLoading(false);
            }
    };
    const handleLogout = async () => {
        setLoading(true);
        try{
            const data = await logout();
        }catch(err){

        }finally{
        setUser(null);
        setLoading(false);
    };
}

useEffect(()=>{
        const getAndSendUser=async()=>{
            try {
                const data=await getMe()
                console.log(data);
                
                if (data && data.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getAndSendUser()
    },[])

    return { user, loading, handleLogin, handleRegister, handleLogout };
};
