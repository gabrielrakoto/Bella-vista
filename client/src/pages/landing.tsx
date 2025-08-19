import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import NewsletterSignup from "@/components/newsletter-signup";
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
      
      {/* Newsletter Signup Section */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
      
      <About />
      <Menu />
      <Reservations />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
