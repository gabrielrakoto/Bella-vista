import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dark-brown text-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-playfair font-bold mb-4">Bella Vista</h3>
            <p className="text-cream/80 mb-6">
              Experience the finest dining with breathtaking views and exceptional service. Every meal is a celebration of culinary excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream hover:text-gold transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
                  className="text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#menu" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("#menu"); }}
                  className="text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  Menu
                </a>
              </li>
              <li>
                <a 
                  href="#reservations" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("#reservations"); }}
                  className="text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("#gallery"); }}
                  className="text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
                  className="text-cream/80 hover:text-gold transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors duration-200">Private Dining</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors duration-200">Catering</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors duration-200">Events</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors duration-200">Wine Pairing</a></li>
              <li><a href="#" className="text-cream/80 hover:text-gold transition-colors duration-200">Gift Cards</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-cream/60">&copy; 2024 Bella Vista Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
