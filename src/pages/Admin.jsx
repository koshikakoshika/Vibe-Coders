import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Briefcase, Map } from 'lucide-react';

const Admin = () => {
    const data = [
        { name: 'Jan', users: 400, trips: 240 },
        { name: 'Feb', users: 300, trips: 139 },
        { name: 'Mar', users: 500, trips: 980 },
        { name: 'Apr', users: 278, trips: 390 },
        { name: 'May', users: 189, trips: 480 },
        { name: 'Jun', users: 239, trips: 380 },
    ];

    return (
        <div className="fade-in">
            <h1 style={{ marginBottom: '30px' }}>Admin & Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', background: 'rgba(50, 130, 184, 0.2)', borderRadius: '12px', color: 'var(--primary-light)' }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#aaa' }}>Total Users</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>1,234</div>
                        <div style={{ fontSize: '12px', color: '#4dff4d' }}>+12% this month</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', background: 'rgba(255, 136, 75, 0.2)', borderRadius: '12px', color: 'var(--warm)' }}>
                        <Briefcase size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#aaa' }}>Trips Created</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>856</div>
                        <div style={{ fontSize: '12px', color: '#4dff4d' }}>+24% this month</div>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', background: 'rgba(187, 225, 250, 0.2)', borderRadius: '12px', color: '#BBE1FA' }}>
                        <Map size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#aaa' }}>Active Cities</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>42</div>
                        <div style={{ fontSize: '12px' }}>Global coverage</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Growth Overview</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="name" stroke="#aaa" />
                                <YAxis stroke="#aaa" />
                                <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} />
                                <Legend />
                                <Bar dataKey="users" fill="#3282B8" />
                                <Bar dataKey="trips" fill="#FF884B" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Popular Destinations</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            { name: 'Paris, France', count: 120 },
                            { name: 'Tokyo, Japan', count: 98 },
                            { name: 'New York, USA', count: 85 },
                            { name: 'London, UK', count: 72 },
                            { name: 'Bali, Indonesia', count: 65 }
                        ].map((city, i) => (
                            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #333' }}>
                                <span>{i + 1}. {city.name}</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--primary-light)' }}>{city.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admin;
