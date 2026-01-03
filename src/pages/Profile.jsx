import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Globe, Moon, Bell } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '30px' }}>User Settings</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
                {/* Settings Nav */}
                <div className="glass-panel" style={{ padding: '20px' }}>
                    <div
                        onClick={() => setActiveTab('profile')}
                        style={{ padding: '12px', borderRadius: '8px', background: activeTab === 'profile' ? 'rgba(255,255,255,0.1)' : 'transparent', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}
                    >
                        <User size={18} /> Profile
                    </div>
                    <div
                        onClick={() => setActiveTab('preferences')}
                        style={{ padding: '12px', borderRadius: '8px', background: activeTab === 'preferences' ? 'rgba(255,255,255,0.1)' : 'transparent', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}
                    >
                        <Globe size={18} /> Preferences
                    </div>
                    <div
                        onClick={() => setActiveTab('notifications')}
                        style={{ padding: '12px', borderRadius: '8px', background: activeTab === 'notifications' ? 'rgba(255,255,255,0.1)' : 'transparent', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}
                    >
                        <Bell size={18} /> Notifications
                    </div>
                </div>

                {/* Content */}
                <div className="glass-panel" style={{ padding: '40px' }}>
                    {activeTab === 'profile' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                                <img src={user?.avatar} alt={user?.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                                <div>
                                    <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>Change Avatar</button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Full Name</label>
                                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <User size={18} color="#666" />
                                        <span>{user?.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Email Address</label>
                                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Mail size={18} color="#666" />
                                        <span>{user?.email}</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #333' }}>
                                    <a href="/admin" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        Access Admin Dashboard
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'preferences' && (
                        <div className="fade-in">
                            <h3 style={{ marginBottom: '20px' }}>App Preferences</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #333' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Moon size={20} /> Dark Mode
                                </div>
                                <div style={{ width: '40px', height: '20px', background: 'var(--primary)', borderRadius: '10px', position: 'relative' }}>
                                    <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
