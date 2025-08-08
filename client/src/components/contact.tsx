import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    sendMessageMutation.mutate(data);
  };

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
                  disabled={sendMessageMutation.isPending}
                  className="w-full bg-warm-brown text-white px-8 py-4 rounded-lg hover:bg-warm-brown/90 transition-all duration-200 font-semibold text-lg"
                >
                  {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
