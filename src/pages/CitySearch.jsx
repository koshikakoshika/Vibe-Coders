import React, { useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CitySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Mock database
    const cities = [
        { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', description: 'City of Lights' },
        { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80&w=800', description: 'Metropolis of the Future' },
        { id: 3, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800', description: 'The Concrete Jungle' },
        { id: 4, name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800', description: 'Historic & Modern' },
        { id: 5, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800', description: 'The Eternal City' },
        { id: 6, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea936a79483?auto=format&fit=crop&q=80&w=800', description: 'Luxury in the Desert' },
    ];

    const filteredCities = cities.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Explore the World</h1>
                <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                    <Search style={{ position: 'absolute', left: '20px', top: '18px', color: '#aaa' }} />
                    <input
                        type="text"
                        placeholder="Search cities (e.g. Paris, Tokyo)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 16px 16px 50px',
                            borderRadius: '30px',
                            border: 'none',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '18px',
                            outline: 'none',
                            backdropFilter: 'blur(10px)'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {filteredCities.map(city => (
                    <div key={city.id} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s' }}>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img
                                src={city.image}
                                alt={city.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                className="hover-zoom" // Assuming global css or inline style for zoom
                            />
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h2 style={{ fontSize: '24px' }}>{city.name}</h2>
                                <span style={{ fontSize: '14px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>{city.country}</span>
                            </div>
                            <p style={{ color: '#ccc', marginBottom: '20px' }}>{city.description}</p>
                            <button
                                onClick={() => navigate('/create-trip')}
                                className="btn-primary"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                Plan Trip Here <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CitySearch;
