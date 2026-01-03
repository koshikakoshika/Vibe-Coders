import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TripContext = createContext();

export const useTrips = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);

    useEffect(() => {
        const storedTrips = localStorage.getItem('globeTrotterTrips');
        if (storedTrips) {
            setTrips(JSON.parse(storedTrips));
        } else {
            // Add sample trip
            const sampleTrip = {
                id: 'trip-1',
                title: 'Summer in Paris',
                destination: 'Paris, France',
                startDate: '2024-06-15',
                endDate: '2024-06-20',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
                itinerary: [
                    {
                        date: '2024-06-15',
                        activities: [
                            { id: 'a1', time: '10:00', title: 'Arrival & Check-in', type: 'transport', cost: 0 },
                            { id: 'a2', time: '14:00', title: 'Eiffel Tower Visit', type: 'sightseeing', cost: 35 }
                        ]
                    }
                ],
                budget: 2000,
                travelers: ['Alex', 'Sam']
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

    const value = {
        trips,
        currentTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        selectTrip,
        addActivityToTrip
    };

    return (
        <TripContext.Provider value={value}>
            {children}
        </TripContext.Provider>
    );
};
