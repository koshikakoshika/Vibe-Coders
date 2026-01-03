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

    // Load users from storage or use defaults
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem('globeTrotterUsers');
        if (storedUsers) return JSON.parse(storedUsers);

        // Default demo user
        const demoUser = {
            id: 'u1', name: 'Alex Explorer', email: 'demo@globetrotter.com', password: 'demo123',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
            preferences: { theme: 'dark', currency: 'INR' },
            savedDestinations: []
        };
        return [demoUser];
    });

    useEffect(() => {
        localStorage.setItem('globeTrotterUsers', JSON.stringify(users));
    }, [users]);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            const foundUser = users.find(u => u.email === email && u.password === password);
            if (foundUser) {
                // Don't store password in session
                const { password, ...sessionUser } = foundUser;
                setUser(sessionUser);
                localStorage.setItem('globeTrotterUser', JSON.stringify(sessionUser));
                resolve(sessionUser);
            } else {
                reject(new Error("Invalid email or password"));
            }
        });
    };

    const signup = (name, email, password) => {
        return new Promise((resolve, reject) => {
            if (users.find(u => u.email === email)) {
                reject(new Error("User already exists"));
                return;
            }

            const newUser = {
                id: 'u' + Date.now(),
                name: name,
                email: email,
                password: password,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                preferences: { theme: 'dark', currency: 'INR' },
                savedDestinations: []
            };

            setUsers(prev => [...prev, newUser]);

            const { password: _, ...sessionUser } = newUser;
            setUser(sessionUser);
            localStorage.setItem('globeTrotterUser', JSON.stringify(sessionUser));
            resolve(sessionUser);
        });
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('globeTrotterUser');
    };

    const updateUser = (updates) => {
        setUser(prev => {
            const updated = { ...prev, ...updates };
            localStorage.setItem('globeTrotterUser', JSON.stringify(updated));
            return updated;
        });
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...updates } : u));
    }

    const value = {
        user,
        login,
        signup,
        logout,
        loading,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
