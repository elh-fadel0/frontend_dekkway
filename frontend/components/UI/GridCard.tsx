"use client";

import Card from "@/components/UI/Card";

// L'interface vide n'est pas nécessaire
type GridCardProps = Record<string, never>;

const GridCard: React.FC<GridCardProps> = () => {
  return (
    <div className="w-full items-center flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card banniere="/images/maison.jpg" titre="Maison à louer" quartier="Grand-Standing, Thiès" prix={500000} id="1" />
        <Card banniere="/images/maison1.jpg" titre="Appart à louer" quartier="Centre-Ville, Dakar" prix={300000} id="2" />
        <Card banniere="/images/maison2.jpg" titre="Villa à vendre" quartier="Plage, Mbour" prix={1500000} id="3" />
        <Card banniere="/images/maison3.jpg" titre="Maison moderne" quartier="Banlieue, Rufisque" prix={800000} id="4" />
        <Card banniere="/images/maison2.jpg" titre="Villa à vendre" quartier="Plage, Mbour" prix={1500000} id="5" />
        <Card banniere="/images/maison3.jpg" titre="Maison moderne" quartier="Banlieue, Rufisque" prix={800000} id="6" />
        <Card banniere="/images/maison2.jpg" titre="Villa à vendre" quartier="Plage, Mbour" prix={1500000} id="7" />
        <Card banniere="/images/maison3.jpg" titre="Maison moderne" quartier="Banlieue, Rufisque" prix={800000} id="9" />
      </div>
    </div>
  );
};

export default GridCard;