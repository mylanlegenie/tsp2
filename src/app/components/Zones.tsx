"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: 48.8566,
    lng: 2.3522,
};

export default function Zones() {
    const [coords, setCoords] = useState<Array<{ lat: number; lng: number }[]>>([]);
    const [showMap, setShowMap] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyB1AU_C7Yf9iitx3gezen2mezBuOYA4EFE",
    });

    useEffect(() => {
        if (!showMap) return;

        const loadGeoJSON = async () => {
            try {
                const res = await fetch("/geo/region-ile-de-france.geojson");
                const geojson = await res.json();
                const feature = geojson.features?.[0];
                const geometry = feature?.geometry;

                if (!geometry) {
                    console.error("Pas de géométrie trouvée dans le fichier GeoJSON.");
                    return;
                }

                if (geometry.type === "Polygon") {
                    const converted = (geometry.coordinates as [number, number][][]).map((ring) =>
                        ring.map(([lng, lat]) => ({ lat, lng }))
                    );
                    setCoords(converted);
                }

                if (geometry.type === "MultiPolygon") {
                    const converted = (geometry.coordinates as [[[number, number]]][]).map((polygon) =>
                        polygon[0].map(([lng, lat]) => ({ lat, lng }))
                    );
                    setCoords(converted);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du GeoJSON :", error);
            }
        };

        loadGeoJSON();
    }, [showMap]);

    return (
        <section id="zones" className="py-24 px-6 md:px-20 bg-gray-100 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                    Zones desservies
                </h2>
                <p className="text-gray-700 mb-8 text-base md:text-lg">
                    Nos taxis couvrent tout Paris, les aéroports et l’Île-de-France.
                </p>

                {!showMap && (
                    <button
                        onClick={() => {
                            if (!buttonClicked) {
                                setShowMap(true);
                                setButtonClicked(true);
                            }
                        }}
                        className={`bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer ${buttonClicked
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-800"
                            }`}
                        disabled={buttonClicked}
                    >
                        {buttonClicked
                            ? "Carte en cours de chargement..."
                            : "Voir si ma position est en Île-de-France"}
                    </button>
                )}

                {showMap && isLoaded && (
                    <div className="w-full h-[400px] mt-6 rounded-xl overflow-hidden shadow-xl">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={8}
                            options={{
                                mapTypeControl: false,
                                fullscreenControl: true,
                                zoomControl: true,
                                streetViewControl: false,
                                rotateControl: false,
                                scaleControl: false,
                            }}
                        >
                            {coords.map((path, index) => (
                                <Polygon
                                    key={index}
                                    paths={path}
                                    options={{
                                        fillColor: "#1c398e",
                                        fillOpacity: 0.2,
                                        strokeColor: "#1c398e",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    </div>
                )}
            </div>
        </section>
    );
}