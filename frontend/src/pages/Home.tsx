import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useDelete } from '../hooks/useDelete';
import Main from '../components/Main'

export default function Home() {

    const { userProfile } = useUser();
    const navigate = useNavigate()
    const logout = useLogout()
    const deleteAccount = useDelete()

    const editProfile = () => {
        navigate('/welcome')
    }

    const test = async () => {
        console.log(userProfile)
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