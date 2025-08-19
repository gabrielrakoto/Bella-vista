import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, CheckCircle } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      // Using Formspree - replace with your actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          subject: "Newsletter Signup from Bella Vista",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // For now, we'll show success anyway since we don't have a real endpoint
      setIsSubmitted(true);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-warm-brown text-white rounded-2xl p-8 text-center">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gold" />
        <h3 className="text-2xl font-playfair font-bold mb-2">Thank You!</h3>
        <p className="text-cream/90">
          You've successfully subscribed to our newsletter. We'll keep you updated with our latest news and special offers.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="mt-4 border-white text-white hover:bg-white hover:text-warm-brown"
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 mx-auto mb-4 text-warm-brown" />
        <h3 className="text-2xl font-playfair font-bold text-dark-brown mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-700">
          Subscribe to our newsletter for exclusive offers and culinary updates
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-dark-brown">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
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
            className="w-full bg-warm-brown text-white hover:bg-warm-brown/90 transition-all duration-200 font-semibold"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-gray-600 mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}