import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useDelete = () => {
    const { setToken, email } = useAuth();
    const { setUserProfile } = useUser()
    const navigate = useNavigate()

    const deleteAccount = async () => {
        try {
            await axios.delete('http://localhost:5000/deleteaccount', {
                data: { email }
            });
            localStorage.removeItem('token');
            setToken(null);
            setUserProfile(null);
            navigate('/');
            alert('User deleted successfully!');
        } catch (err) {
            alert('Failed to delete user');
        }
    }
    return deleteAccount;
};
