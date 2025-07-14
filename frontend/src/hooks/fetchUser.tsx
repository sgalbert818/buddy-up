import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const useFetchUser = () => {
    const { setUserProfile } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const checkForUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) navigate('/'); // no token = redirect
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                };
                const response = await axios.get('http://localhost:5000/getuser', config);
                console.log('user found')
                setUserProfile({
                    name: response.data.name,
                    age: response.data.age,
                    interests: response.data.interests,
                });
            } catch (err) {
                const error = err as any;
                console.error(error.response?.data?.message || 'Failed to fetch user.');
                navigate('/');
            }
        };

        checkForUser();
    }, [setUserProfile]);
};