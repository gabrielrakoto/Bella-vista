import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarCheck, CheckCircle } from "lucide-react";

const reservationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
  guests: z.number().min(1, "Number of guests is required"),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function Reservations() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: new Date(),
      time: "",
      guests: 2,
      occasion: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);

    try {
      // Préparer les données pour Formspree
      const formData = new FormData();

      // Ajouter tous les champs du formulaire
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('date', data.date.toLocaleDateString('fr-FR'));
      formData.append('time', data.time);
      formData.append('guests', data.guests.toString());

      // Champs optionnels
      if (data.occasion) {
        formData.append('occasion', data.occasion);
      }
      if (data.specialRequests) {
        formData.append('specialRequests', data.specialRequests);
      }

      // Ajouter un sujet pour l'email
      formData.append('_subject', `Nouvelle réservation - ${data.firstName} ${data.lastName}`);

      // Envoyer à Formspree
      const response = await fetch('https://formspree.io/f/xeolnkwo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Reservation Submitted",
          description: "Your reservation request has been submitted successfully! We'll contact you soon to confirm.",
        });
        setIsSubmitted(true);
        form.reset();
      } else {
        // Gérer les erreurs de Formspree
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error", 
        description: "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <section id="reservations" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-4">Reservation Submitted</h2>
          </div>
          <div className="bg-green-50 rounded-3xl p-8 shadow-xl text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h3 className="text-2xl font-playfair font-bold text-dark-brown mb-4">Thank You!</h3>
            <p className="text-lg text-gray-700 mb-6">
              Your reservation request has been submitted successfully. We'll contact you soon to confirm your booking.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-warm-brown text-white hover:bg-warm-brown/90"
            >
              Make Another Reservation
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservations" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark-brown mb-4">Make a Reservation</h2>
          <p className="text-xl text-gray-700">Reserve your table for an unforgettable dining experience</p>
        </div>

        <div className="bg-cream rounded-3xl p-8 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">First Name</FormLabel>
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Last Name</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="tel"
                        className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        min={minDate}
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gold/30 focus:border-warm-brown">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="17:30">5:30 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="18:30">6:30 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="19:30">7:30 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="20:30">8:30 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Number of Guests</FormLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="border-gold/30 focus:border-warm-brown">
                          <SelectValue placeholder="Select Guests" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-dark-brown">Special Occasion (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gold/30 focus:border-warm-brown">
                          <SelectValue placeholder="Select Occasion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="business">Business Dinner</SelectItem>
                        <SelectItem value="romantic">Romantic Dinner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-semibold text-dark-brown">Special Requests</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={4}
                        placeholder="Any dietary restrictions or special requests..."
                        className="border-gold/30 focus:border-warm-brown focus:ring-warm-brown/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 text-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-warm-brown text-white px-8 py-4 rounded-lg hover:bg-warm-brown/90 transition-all duration-200 font-semibold text-lg"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Submitting..." : "Confirm Reservation"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}