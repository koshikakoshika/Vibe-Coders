import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TripContext = createContext();

export const useTrips = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [currency, setCurrency] = useState('INR');

    useEffect(() => {
        const storedTrips = localStorage.getItem('globeTrotterTrips');

        // CHECK FOR KOSHIKA USER (from AuthContext storage to avoid hook complexity/circular deps)
        const storedUser = localStorage.getItem('globeTrotterUser');
        const isKoshika = storedUser && JSON.parse(storedUser).email === 'koshikat03@gmail.com';

        if (isKoshika) {
            // FORCE INJECT DEMO DATA FOR KOSHIKA
            const today = new Date();
            const currentMonthStr = today.toISOString().slice(0, 7); // YYYY-MM

            const koshikaTrips = [
                {
                    id: 'trip-koshika-1',
                    title: 'Wanderlust in Manali',
                    destination: 'Manali, India',
                    startDate: `${currentMonthStr}-05`,
                    endDate: `${currentMonthStr}-10`,
                    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
                    budget: 35000,
                    itinerary: [
                        {
                            date: `${currentMonthStr}-05`,
                            activities: [
                                { id: 'm1', time: '09:00', title: 'Breakfast at The Lazy Dog', type: 'food', cost: 1200 },
                                { id: 'm2', time: '11:00', title: 'Hadimba Temple Visit', type: 'culture', cost: 100 },
                                { id: 'm3', time: '14:00', title: 'Solang Valley Paragliding', type: 'sightseeing', cost: 3500 },
                                { id: 'm4', time: '20:00', title: 'Dinner at Café 1947', type: 'food', cost: 1800 }
                            ]
                        },
                        {
                            date: `${currentMonthStr}-06`,
                            activities: [
                                { id: 'm5', time: '10:00', title: 'Jogini Falls Trek', type: 'sightseeing', cost: 0 },
                                { id: 'm6', time: '13:00', title: 'Riverside Lunch', type: 'food', cost: 900 },
                                { id: 'm7', time: '17:00', title: 'Old Manali Shopping', type: 'other', cost: 4500 }
                            ]
                        }
                    ]
                },
                {
                    id: 'trip-koshika-2',
                    title: 'Sunny Goa Escape',
                    destination: 'Goa, India',
                    startDate: `${currentMonthStr}-15`,
                    endDate: `${currentMonthStr}-18`,
                    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
                    budget: 45000,
                    itinerary: [
                        {
                            date: `${currentMonthStr}-15`,
                            activities: [
                                { id: 'g1', time: '12:00', title: 'Arrival & Villa Check-in', type: 'transport', cost: 0 },
                                { id: 'g2', time: '14:00', title: 'Lunch at Fisherman\'s Wharf', type: 'food', cost: 2200 },
                                { id: 'g3', time: '16:30', title: 'Sunset at Vagator Beach', type: 'sightseeing', cost: 0 },
                                { id: 'g4', time: '21:00', title: 'Thalassa Dinner', type: 'food', cost: 3500 }
                            ]
                        },
                        {
                            date: `${currentMonthStr}-16`,
                            activities: [
                                { id: 'g5', time: '10:00', title: 'Scuba Diving at Grand Island', type: 'sightseeing', cost: 5500 },
                                { id: 'g6', time: '19:00', title: 'Anjuna Night Market', type: 'other', cost: 2000 }
                            ]
                        }
                    ]
                }
            ];
            setTrips(koshikaTrips);
            localStorage.setItem('globeTrotterTrips', JSON.stringify(koshikaTrips));
        } else if (storedTrips) {
            setTrips(JSON.parse(storedTrips));
        } else {
            // Fallback for new unknown users
            const sampleTrip = {
                id: 'trip-1',
                title: 'Summer in Paris',
                destination: 'Paris, France',
                startDate: '2024-06-15',
                endDate: '2024-06-20',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
                itinerary: [],
                budget: 200000
            };
            setTrips([sampleTrip]);
            localStorage.setItem('globeTrotterTrips', JSON.stringify([sampleTrip]));
        }
    }, []);

    useEffect(() => {
        if (trips.length > 0) {
            localStorage.setItem('globeTrotterTrips', JSON.stringify(trips));
        }
    }, [trips]);

    const addTrip = (tripData) => {
        const newTrip = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            itinerary: [], // Initialize empty itinerary
            ...tripData
        };
        setTrips(prev => [...prev, newTrip]);
        return newTrip;
    };

    const updateTrip = (id, updates) => {
        setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
        if (currentTrip && currentTrip.id === id) {
            setCurrentTrip(prev => ({ ...prev, ...updates }));
        }
    };

    const deleteTrip = (id) => {
        setTrips(prev => prev.filter(t => t.id !== id));
    };

    const selectTrip = (id) => {
        const trip = trips.find(t => t.id === id);
        setCurrentTrip(trip || null);
        return trip;
    };

    const addActivityToTrip = (tripId, dayDate, activity) => {
        setTrips(prev => prev.map(t => {
            if (t.id !== tripId) return t;

            const newItinerary = [...(t.itinerary || [])];
            let dayIndex = newItinerary.findIndex(d => d.date === dayDate);

            if (dayIndex === -1) {
                newItinerary.push({ date: dayDate, activities: [activity] });
                // Sort days by date
                newItinerary.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else {
                newItinerary[dayIndex].activities.push(activity);
                // Sort activities by time
                newItinerary[dayIndex].activities.sort((a, b) => a.time.localeCompare(b.time));
            }

            return { ...t, itinerary: newItinerary };
        }));
    };

    const deleteActivityFromTrip = (tripId, dayDate, activityId) => {
        setTrips(prev => prev.map(t => {
            if (t.id !== tripId) return t;

            const newItinerary = (t.itinerary || []).map(day => {
                if (day.date !== dayDate) return day;
                return {
                    ...day,
                    activities: day.activities.filter(a => a.id !== activityId)
                };
            }).filter(day => day.activities.length > 0 || day.date === t.startDate); // Keep start date or if has activities

            return { ...t, itinerary: newItinerary };
        }));
    };

    // Exchange rates (approximate for demo)
    const rates = {
        INR: 1,
        USD: 0.012,
        EUR: 0.011
    };

    // Symbols
    const currencySymbols = {
        INR: '₹',
        USD: '$',
        EUR: '€'
    };

    const convertCost = (amount) => {
        // Base is INR (as the mock data is now mostly INR or ambiguous)
        // If data was stored in INR, just multiply. 
        // For this demo, let's assume stored values are INR.
        if (!amount) return 0;
        return Math.round(amount * rates[currency]);
    };

    const value = {
        trips,
        currentTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        selectTrip,
        addActivityToTrip,
        deleteActivityFromTrip,
        currency,
        setCurrency,
        convertCost,
        rates, // Expose rates for inverse conversion
        currencySymbol: currencySymbols[currency]
    };

    return (
        <TripContext.Provider value={value}>
            {children}
        </TripContext.Provider>
    );
};
