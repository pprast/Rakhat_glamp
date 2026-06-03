import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/sections/HeroSection'
import ManifestoSection from '@/sections/ManifestoSection'
import ExperienceSection from '@/sections/ExperienceSection'
import CabinsSection from '@/sections/CabinsSection'
import AmenitiesSection from '@/sections/AmenitiesSection'
import WaterSection from '@/sections/WaterSection'
import ReviewsSection from '@/sections/ReviewsSection'
import BookingCTASection from '@/sections/BookingCTASection'
import LocationSection from '@/sections/LocationSection'

export default function LandingPage() {
  return (
    <div className="bg-sand-white">
      <Navbar />

      {/* 1. Hero — full viewport */}
      <HeroSection />

      {/* 2. Manifesto / Brand story */}
      <ManifestoSection />

      {/* 3. Experience — GSAP horizontal scroll */}
      <ExperienceSection />

      {/* 4. Cabins — light section */}
      <CabinsSection />

      {/* 5. Amenities */}
      <AmenitiesSection />

      {/* 6. Water — full-bleed (has own dividers) */}
      <WaterSection />

      {/* 7. Reviews */}
      <ReviewsSection />

      {/* 8. Booking CTA */}
      <BookingCTASection />

      {/* 9. Location */}
      <LocationSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
