import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import About from "@/components/about";
import Menu from "@/components/menu";
import Reservations from "@/components/reservations";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Reservations />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
