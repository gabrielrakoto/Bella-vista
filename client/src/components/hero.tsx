import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">Bella Vista</h1>
        <p className="text-xl md:text-2xl mb-8 font-light">Exquisite dining with a view that takes your breath away</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-warm-brown text-white px-8 py-4 rounded-lg hover:bg-warm-brown/90 transition-all duration-300 font-semibold text-lg"
            onClick={() => scrollToSection("#reservations")}
          >
            Make Reservation
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-dark-brown transition-all duration-300 font-semibold text-lg"
            onClick={() => scrollToSection("#menu")}
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
