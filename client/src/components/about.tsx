import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Bella Vista, we believe that dining is more than just a meal—it's an experience that engages all your senses. Our chef-driven menu celebrates seasonal ingredients and innovative techniques.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              With breathtaking views and an atmosphere of refined elegance, we invite you to discover a culinary journey that will create memories to last a lifetime.
            </p>
            <Button className="bg-gold text-dark-brown px-6 py-3 rounded-lg hover:bg-gold/90 transition-all duration-200 font-semibold">
              Learn More
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Professional chef preparing elegant dish" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
