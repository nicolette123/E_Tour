import TourHero from '@/components/tour/TourHero';
import TourCards from '@/components/tour/TourCards';

export default function TourPackagePage() {
  return (
    <main>
     

     <TourHero />
     {/* Existing filters */}
      <TourCards />
      {/* Additional sections */}
    </main>
  );
}
