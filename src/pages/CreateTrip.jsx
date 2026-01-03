import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Calendar, MapPin, DollarSign, Users, Sparkles } from 'lucide-react';

const CreateTrip = () => {
    const navigate = useNavigate();
    const { addTrip } = useTrips();
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: '',
        travelers: 1
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulate AI generation delay
        setTimeout(() => {
            // Create basic trip structure
            const days = calculateDays(formData.startDate, formData.endDate);
            const itinerary = [];

            // Mock AI generating an itinerary
            for (let i = 0; i < days; i++) {
                const date = addDays(formData.startDate, i);
                itinerary.push({
                    date,
                    activities: generateMockActivities(formData.destination, i)
                });
            }

            const newTrip = addTrip({
                title: `Trip to ${formData.destination}`,
                destination: formData.destination,
                startDate: formData.startDate,
                endDate: formData.endDate,
                budget: Number(formData.budget),
                travelers: Number(formData.travelers),
                itinerary: itinerary,
                image: `https://source.unsplash.com/800x600/?${formData.destination},travel` // Unsplash source might be deprecated/redirect, usage cautious
                // Using a generic fallback in real app or specific images.
                // For now, let's use a static Unsplash Search URL method nicely or just a placeholder if it fails.
            });

            setIsGenerating(false);
            navigate(`/trips/${newTrip.id}`);
        }, 2000);
    };

    // Helper to add days
    const addDays = (dateStr, days) => {
        const result = new Date(dateStr);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    };

    // Helper to calc duration
    const calculateDays = (start, end) => {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const generateMockActivities = (dest, dayIndex) => {
        // Very basic mock
        return [
            { id: `d${dayIndex}-a1`, time: '09:00', title: 'Breakfast at local cafe', type: 'food', cost: 20 },
            { id: `d${dayIndex}-a2`, time: '11:00', title: `Explore ${dest} Center`, type: 'sightseeing', cost: 0 },
            { id: `d${dayIndex}-a3`, time: '14:00', title: 'Museum Visit', type: 'culture', cost: 25 },
            { id: `d${dayIndex}-a4`, time: '19:00', title: 'Dinner', type: 'food', cost: 50 },
        ];
    };

    return (
        <div className="fade-inContainer" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px' }}>Plan Your Next Adventure</h1>

            {isGenerating ? (
                <div style={{ textAlign: 'center', padding: '60px', borderRadius: '12px', background: 'var(--bg-card)' }}>
                    <Sparkles size={48} className="fade-in" style={{ color: 'var(--warm)', marginBottom: '20px', animation: 'spin 3s linear infinite' }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    <h2>Consulting GlobeBot AI...</h2>
                    <p style={{ color: '#aaa' }}>Crafting the perfect itinerary for {formData.destination}...</p>
                </div>
            ) : (
                <div className="glass-panel" style={{ padding: '40px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Where to?</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }} />
                                <input
                                    required
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="e.g. Tokyo, Paris, New York"
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Start Date</label>
                                <input
                                    required
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>End Date</label>
                                <input
                                    required
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Budget (USD)</label>
                                <div style={{ position: 'relative' }}>
                                    <DollarSign size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }} />
                                    <input
                                        required
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="2000"
                                        style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Travelers</label>
                                <div style={{ position: 'relative' }}>
                                    <Users size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }} />
                                    <input
                                        required
                                        type="number"
                                        name="travelers"
                                        min="1"
                                        value={formData.travelers}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sparkles size={18} /> Generate Itinerary with AI
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateTrip;
