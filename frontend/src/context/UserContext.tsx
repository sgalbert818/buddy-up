import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
    name: string,
    age: number | string,
    interests: Array<string>
}

interface UserContextType {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserContext.Provider>
    );
};