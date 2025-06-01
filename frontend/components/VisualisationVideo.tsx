'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VisualisationVideoProps {
  videoUrl: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  propertyId?: string | number; // Ajouter l'ID de la propriété
}

export default function VisualisationVideo({
  videoUrl,
  title,
  location,
  price,
  currency = 'FCFAA',
  propertyId, // Ajouter propertyId
}: VisualisationVideoProps) {
  const router = useRouter(); // Enlever l'underscore

  const handleReserve = () => {
    // Créer les données de propriété pour Reservloge
    const propertyData = {
      id: propertyId,
      nom: title,
      ville: location,
      prix: price,
      image: '' // Vous pouvez ajouter une image par défaut ou la passer en props
    };
    
    // Naviguer vers Reservloge avec les données de propriété
    router.push(`/Reservloge?property=${encodeURIComponent(JSON.stringify(propertyData))}`);
  };
  
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    console.error("Erreur de chargement de la vidéo:", videoUrl);
    setVideoError(true);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Visite Guidée</h1>

      <div className="bg-white rounded-xl overflow-hidden shadow-md">
        <div className="relative">
          {!videoError && videoUrl ? (
            <video 
              src={videoUrl} // Suppression de "|| null"
              controls 
              className="w-full h-full object-cover"
              onError={handleVideoError}
            >
              Votre navigateur ne prend pas en charge la lecture de vidéos.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <p className="text-red-500 font-bold">La vidéo n&apos;a pas pu être chargée</p>
                <p className="text-gray-600 mt-2">Veuillez réessayer ultérieurement ou contacter le support.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            📍 {location}
          </p>
          <p className="text-blue-700 font-bold mt-2 text-lg">
            {price.toLocaleString()} {currency} <span className="text-sm font-medium text-gray-600">/ Mois</span>
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReserve}
              className="bg-[#004080] hover:bg-[#0059b3] text-white px-6 py-2 rounded-full shadow transition"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}