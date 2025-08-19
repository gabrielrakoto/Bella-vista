import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactMessageSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual Formspree or email service)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We'll get back to you soon.",
      });
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-4">Message Sent</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-8 shadow-xl text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h3 className="text-2xl font-playfair font-bold text-dark-brown mb-4">Thank You!</h3>
            <p className="text-lg text-gray-700 mb-6">
              Your message has been sent successfully. We'll get back to you soon!
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-warm-brown text-white hover:bg-warm-brown/90"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-4">Contact Us</h2>
          <p className="text-xl text-gray-700">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-warm-brown text-white p-3 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Address</h3>
                  <p className="text-gray-700">123 Elegant Avenue<br />Downtown District<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-warm-brown text-white p-3 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Phone</h3>
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-warm-brown text-white p-3 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Email</h3>
                  <p className="text-gray-700">info@bellavista.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-warm-brown text-white p-3 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Hours</h3>
                  <p className="text-gray-700">
                    Mon-Thu: 5:00 PM - 10:00 PM<br />
                    Fri-Sat: 5:00 PM - 11:00 PM<br />
                    Sun: 4:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-brown">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-brown">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-brown">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-dark-brown">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={6}
                          className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-warm-brown text-white px-8 py-4 rounded-lg hover:bg-warm-brown/90 transition-all duration-200 font-semibold text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
