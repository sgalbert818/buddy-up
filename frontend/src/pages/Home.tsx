import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useDelete } from '../hooks/useDelete';
import Main from '../components/Main'
import { useFetchUser } from '../hooks/fetchUser'
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {

    useFetchUser(); // check and load user profile on mount

    useEffect(() => {
        const getDisplay = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/getallusers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDisplay(response.data.users)
            } catch (err) {
                console.error('Failed to load other users:', err);
            }
        };
        getDisplay()
    }, []);

    const { userProfile } = useUser();
    const navigate = useNavigate()
    const logout = useLogout()
    const deleteAccount = useDelete()
    const [display, setDisplay] = useState([])

    const editProfile = () => {
        navigate('/welcome')
    }

    const test = async () => {
        console.log(display)
    };

    return (
        <div>
            <h3>Welcome {userProfile?.name || ''}</h3>
            <div>
                <Main />
            </div>
            <button onClick={test}>Test</button>
            <button onClick={editProfile}>Edit Profile</button>
            <button onClick={logout}>Sign Out</button>
            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}