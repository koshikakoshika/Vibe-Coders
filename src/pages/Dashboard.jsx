import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { trips } = useTrips();

    // Mock recommendations
    const recommendations = [
        {
            id: 1,
            title: 'Kyoto in Autumn',
            location: 'Kyoto, Japan',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
            days: 7,
            price: '$1,800'
        },
        {
            id: 2,
            title: 'Amalfi Coast Drive',
            location: 'Amalfi, Italy',
            image: 'https://images.unsplash.com/photo-1633321088355-d0f8c1eaad48?auto=format&fit=crop&q=80&w=800',
            days: 5,
            price: '$2,200'
        },
        {
            id: 3,
            title: 'Safari Adventure',
            location: 'Serengeti, Tanzania',
            image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
            days: 10,
            price: '$3,500'
        }
    ];

    return (
        <div className="fade-in">
            {/* Header */}
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>
                    Welcome back, <span className="text-gradient">{user?.name}</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Ready for your next adventure?</p>
            </header>

            {/* Quick Action Banner */}
            <div className="glass-panel" style={{
                padding: '30px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(15, 76, 117, 0.3), rgba(30,30,30,0.5))'
            }}>
                <div>
                    <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Plan a New Trip</h2>
                    <p style={{ color: '#ccc', maxWidth: '500px' }}>
                        Let our AI assist you in building the perfect itinerary. Tell GlobeBot where you want to go.
                    </p>
                </div>
                <Link to="/create-trip" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} /> Create Trip
                </Link>
            </div>

            {/* Upcoming Trips */}
            <section style={{ marginBottom: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>Your Trips</h2>
                    <Link to="/trips" style={{ color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                {trips.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #444', borderRadius: '12px' }}>
                        <p>No trips yet. Start planning!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {trips.slice(0, 3).map(trip => (
                            <div key={trip.id} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}>
                                <div style={{ height: '160px', overflow: 'hidden' }}>
                                    <img src={trip.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'}
                                        alt={trip.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{trip.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '14px', marginBottom: '6px' }}>
                                        <MapPin size={14} /> {trip.destination}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '14px' }}>
                                        <Calendar size={14} /> {trip.startDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Recommendations */}
            <section>
                <h2 style={{ marginBottom: '20px' }}>Recommended for You</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {recommendations.map(place => (
                        <div key={place.id} className="glass-panel" style={{ overflow: 'hidden' }}>
                            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img src={place.image} alt={place.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute', bottom: 10, right: 10,
                                    backgroundColor: 'rgba(0,0,0,0.7)', padding: '4px 12px',
                                    borderRadius: '20px', fontSize: '12px'
                                }}>
                                    {place.days} Days
                                </div>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '18px' }}>{place.title}</h3>
                                    <span style={{ color: 'var(--warm)', fontWeight: 'bold' }}>{place.price}</span>
                                </div>
                                <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '16px' }}>
                                    {place.location}
                                </div>
                                <button className="btn-secondary" style={{ width: '100%', fontSize: '14px', padding: '8px' }}>
                                    Explore Itinerary
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
