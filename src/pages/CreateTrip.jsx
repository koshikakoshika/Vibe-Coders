import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../context/TripContext';
import { Calendar, MapPin, DollarSign, Users, Sparkles } from 'lucide-react';

const CreateTrip = () => {
    const navigate = useNavigate();
    const { addTrip, currency, currencySymbol, rates } = useTrips();
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: '', // Stores the RAW input value
        travelers: 1,
        description: '',
        imageUrl: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerating(true);

        const currentRate = rates[currency] || 1;
        // Convert input budget to INR for storage
        const budgetInINR = Math.round(Number(formData.budget) / currentRate);

        setTimeout(() => {
            const daysCount = calculateDays(formData.startDate, formData.endDate);
            const itinerary = [];

            // Generate unique activities for each day to prevent duplication bug
            for (let i = 0; i < daysCount; i++) {
                const date = addDays(formData.startDate, i);
                itinerary.push({
                    date,
                    activities: generateMockActivities(formData.destination, i + 1) // Pass day number for uniqueness
                });
            }

            const newTrip = addTrip({
                title: `Trip to ${formData.destination}`,
                destination: formData.destination,
                startDate: formData.startDate,
                endDate: formData.endDate,
                budget: budgetInINR,
                travelers: Number(formData.travelers),
                description: formData.description || `A wonderful trip to ${formData.destination}`,
                itinerary: itinerary,
                image: formData.imageUrl || `https://source.unsplash.com/800x600/?${formData.destination},travel`
            });

            setIsGenerating(false);
            navigate(`/trips/${newTrip.id}`);
        }, 2500);
    };

    const addDays = (dateStr, days) => {
        const result = new Date(dateStr);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    };

    const calculateDays = (start, end) => {
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Improved Mock Activity Generator
    const generateMockActivities = (dest, dayNum) => {
        const activities = [
            [
                { time: '09:00', title: 'Breakfast at City Cafe', type: 'food', cost: 500 },
                { time: '11:00', title: `City Tour: ${dest} Landmarks`, type: 'sightseeing', cost: 1200 },
                { time: '14:00', title: 'Local Market Visit', type: 'culture', cost: 0 },
                { time: '19:00', title: 'Welcome Dinner', type: 'food', cost: 1500 }
            ],
            [
                { time: '10:00', title: 'Museum & Art Gallery', type: 'culture', cost: 800 },
                { time: '13:00', title: 'Lunch at Hidden Gem', type: 'food', cost: 600 },
                { time: '16:00', title: 'Sunset Viewpoint', type: 'sightseeing', cost: 0 },
                { time: '20:00', title: 'Live Music Event', type: 'culture', cost: 1000 }
            ],
            [
                { time: '08:00', title: 'Morning Nature Walk', type: 'sightseeing', cost: 0 },
                { time: '12:00', title: 'Adventure Activity', type: 'other', cost: 2500 },
                { time: '18:00', title: 'Shopping Street', type: 'culture', cost: 2000 },
                { time: '21:00', title: 'Rooftop Dinner', type: 'food', cost: 1800 }
            ]
        ];

        // Cycle through templates based on day number to ensure variety
        const template = activities[(dayNum - 1) % activities.length];
        return template.map((act, idx) => ({
            id: `d${dayNum}-a${idx}`,
            ...act
        }));
    };

    return (
        <div className="fade-inContainer" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px' }}>Plan Your Next Adventure</h1>

            {isGenerating ? (
                <div style={{ textAlign: 'center', padding: '60px', borderRadius: '12px', background: 'var(--bg-card)' }}>
                    <Sparkles size={48} className="fade-in" style={{ color: 'var(--warm)', marginBottom: '20px', animation: 'spin 3s linear infinite' }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    <h2>Consulting GlobeBot AI...</h2>
                    <p style={{ color: '#aaa' }}>Crafting a unique day-by-day itinerary for {formData.destination}...</p>
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
                                    placeholder="e.g. Manali, Goa, Jaipur"
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Trip Description (Optional)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your trip goal e.g. 'Relaxing weekend getaway'"
                                rows="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Cover Image URL (Optional)</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                            />
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
                                <label style={{ display: 'block', marginBottom: '8px' }}>Budget ({currency} {currencySymbol})</label>
                                <div style={{ position: 'relative' }}>
                                    <DollarSign size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }} />
                                    <input
                                        required
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="50000"
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
