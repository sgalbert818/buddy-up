import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useDelete } from '../hooks/useDelete';

/* interface Error {
    response: {
        data: {
            message: string
        }
    }
    status: number
} */

export default function Home() {

    const { userProfile } = useUser();
    const navigate = useNavigate()
    const logout = useLogout()
    const deleteAccount = useDelete()

    const editProfile = () => {
        navigate('/welcome')
    }

    const test = async () => {
        /* if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Ensure it's treated as JSON
                    }
                };
                const response = await axios.post('http://localhost:5000/test', 'placeholder', config);
                const userProfile = response.data
                console.log('Response from backend:', userProfile);
            } catch (err) {
                const error = err as Error;
                alert(error.response.data.message)
            }
        }*/
        console.log(userProfile)
    };

    return (
        <div>
            <h3>Welcome {userProfile?.name || ''}</h3>
            <button onClick={test}>Test</button>
            <button onClick={editProfile}>Edit Profile</button>
            <button onClick={logout}>Sign Out</button>
            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}