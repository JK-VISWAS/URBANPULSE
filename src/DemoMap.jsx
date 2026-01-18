import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const DemoMap = ({ reports }) => {
    const { isLoaded } = useJsApiLoader({
        // Replace the string below with your key from the Cloud Console
        googleMapsApiKey: "AIzaSyBcO2VuRI5Ape9JruOTl9WqU08tNBfCknA"
    });

    const center = { lat: 20.5937, lng: 78.9629 }; // Default center (India)

    if (!isLoaded) return <div className="h-full w-full bg-slate-800 animate-pulse rounded-[40px] flex items-center justify-center text-white">Loading Live Map...</div>;

    return (
        <GoogleMap
            mapContainerClassName="w-full h-full rounded-[40px]"
            center={center}
            zoom={5}
            options={{
                styles: [{ "elementType": "geometry", "stylers": [{ "color": "#212121" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }] // Dark Mode
            }}
        >
            {reports.map((report) => (
                <Marker
                    key={report.id}
                    position={{ lat: report.location?.lat || 20, lng: report.location?.lng || 78 }}
                    title={report.title}
                />
            ))}
        </GoogleMap>
    );
};

export default DemoMap;
