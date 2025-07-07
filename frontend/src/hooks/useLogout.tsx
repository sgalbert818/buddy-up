import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { setToken, setEmail } = useAuth();
    const { setUserProfile } = useUser()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setEmail(null);
        setUserProfile(null);
        navigate('/');
    };
    return logout;
};