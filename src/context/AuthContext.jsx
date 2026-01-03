import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('globeTrotterUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - allow any credentials for demo
        const mockUser = {
            id: 'u1',
            name: 'Alex Explorer',
            email: email,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
            preferences: {
                theme: 'dark',
                currency: 'USD'
            }
        };
        setUser(mockUser);
        localStorage.setItem('globeTrotterUser', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    };

    const signup = (name, email, password) => {
        const mockUser = {
            id: 'u' + Date.now(),
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            preferences: {
                theme: 'dark',
                currency: 'USD'
            }
        };
        setUser(mockUser);
        localStorage.setItem('globeTrotterUser', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('globeTrotterUser');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
