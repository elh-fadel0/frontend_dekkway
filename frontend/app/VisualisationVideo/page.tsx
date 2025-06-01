"use client";

import React, { useState, useEffect } from "react";
import VisualisationVideo from "@/components/VisualisationVideo";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [propertyId, setPropertyId] = useState<string | null>(null); // Ajouter l'état pour l'ID
    const [propertyData, setPropertyData] = useState({
        videoUrl: "/videos/maison-thies.mp4",
        title: "Maison à louer",
        location: "Grand-Standing, Thiès",
        price: 300000
    });

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const propertyIdFromParams = searchParams.get('id') || searchParams.get('video');
                
                if (propertyIdFromParams) {
                    localStorage.setItem('currentPropertyId', propertyIdFromParams);
                    setPropertyId(propertyIdFromParams); // Stocker l'ID
                } else {
                    const storedId = localStorage.getItem('currentPropertyId');
                    if (!storedId) {
                        console.log("Aucun ID de logement trouvé, utilisation des données par défaut");
                        setLoading(false);
                        return;
                    }
                    setPropertyId(storedId); // Stocker l'ID depuis localStorage
                }
                
                const idToUse = propertyIdFromParams || localStorage.getItem('currentPropertyId');
                
                if (!idToUse) {
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(`http://127.0.0.1:8000/details-logements/${idToUse}/`);
                const data = response.data;
                
                const video = data.medias?.find(media => media.type === "video")?.fichier || "/videos/maison-thies.mp4";
                
                setPropertyData({
                    videoUrl: video,
                    title: `${data.type || "Logement"} - ${data.region || ""}`,
                    location: `${data.quartier || ""}, ${data.region || ""}`,
                    price: typeof data.prix === 'string' ? parseInt(data.prix.replace(/[^0-9]/g, '')) : (data.prix || 0)
                });
            } catch (error) {
                console.log('Erreur lors de la récupération des données:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [searchParams]);

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={handleBack}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
            </button>
            
            <VisualisationVideo
                videoUrl={propertyData.videoUrl}
                title={propertyData.title}
                location={propertyData.location}
                price={propertyData.price}
                propertyId={propertyId} // Passer l'ID de la propriété
            />
        </div>
    );
}