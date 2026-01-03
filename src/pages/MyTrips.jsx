import React from 'react';
import { useTrips } from '../context/TripContext';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Plus } from 'lucide-react';

const MyTrips = () => {
    const { trips } = useTrips();

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>My Trips</h1>
                <Link to="/create-trip" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} /> Plan New Trip
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {trips.map(trip => (
                    <Link key={trip.id} to={`/trips/${trip.id}`} style={{ textDecoration: 'none' }}>
                        <div className="glass-panel" style={{ height: '100%', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ height: '200px', backgroundColor: '#333' }}>
                                {/* Placeholder for real image since Unsplash source API is unpredictable without keys, using a solid color or generic if needed, but trying a generic logical image */}
                                <img
                                    src={trip.image || `https://ui-avatars.com/api/?name=${trip.destination}&background=random`}
                                    alt={trip.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Trip'; }} // Fallback
                                />
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'white' }}>{trip.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', marginBottom: '8px' }}>
                                    <MapPin size={16} /> {trip.destination}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', marginBottom: '12px' }}>
                                    <Calendar size={16} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </div>
                                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                        {trip.days || 'Multi-day'} Trip
                                    </span>
                                    <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                        ${trip.budget} Budget
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyTrips;
