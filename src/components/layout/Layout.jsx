import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Map, Calendar, User, LogOut, PlusCircle, Globe } from 'lucide-react';
import styles from './Layout.module.css';
import ChatWidget from '../common/ChatWidget';

const Layout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <Compass size={32} color="var(--primary-light)" />
                    <span>GlobeTrotter</span>
                </div>

                <nav className={styles.nav}>
                    <Link to="/dashboard" className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}>
                        <Map size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/explore" className={`${styles.navItem} ${isActive('/explore') ? styles.active : ''}`}>
                        <Globe size={20} />
                        <span>Explore</span>
                    </Link>
                    <Link to="/trips" className={`${styles.navItem} ${isActive('/trips') ? styles.active : ''}`}>
                        <Calendar size={20} />
                        <span>My Trips</span>
                    </Link>
                    <Link to="/create-trip" className={`${styles.navItem} ${isActive('/create-trip') ? styles.active : ''}`}>
                        <PlusCircle size={20} />
                        <span>Plan Trip</span>
                    </Link>
                    <Link to="/profile" className={`${styles.navItem} ${isActive('/profile') ? styles.active : ''}`}>
                        <User size={20} />
                        <span>Profile</span>
                    </Link>
                </nav>

                <div className={styles.userSection}>
                    <div className={styles.userInfo}>
                        <img src={user?.avatar} alt={user?.name} className={styles.avatar} />
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user?.name}</span>
                            <button onClick={logout} className={styles.logoutBtn}>
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className={styles.main}>
                <Outlet />
            </main>

            <ChatWidget />
        </div>
    );
};

export default Layout;
