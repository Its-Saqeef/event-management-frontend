import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEventBySlug } from "@/services/event-service";
import { Spinner } from "@/components/ui/spinner";

export default function Checkout() {
  const [match, params] = useRoute("/checkout/:slug");
  const { data: event, isLoading, error } = useEventBySlug(params?.slug || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="h-10 w-10" />
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Payment Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase to secure your spot.</p>
            </div>

            <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <CreditCard className="size-5 text-primary" /> Payment Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>First Name</Label>
                     <Input placeholder="John" className="bg-white/5 border-white/10" />
                   </div>
                   <div className="space-y-2">
                     <Label>Last Name</Label>
                     <Input placeholder="Doe" className="bg-white/5 border-white/10" />
                   </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 pl-10" />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Expiry Date</Label>
                     <Input placeholder="MM/YY" className="bg-white/5 border-white/10" />
                   </div>
                   <div className="space-y-2">
                     <Label>CVC</Label>
                     <Input placeholder="123" className="bg-white/5 border-white/10" />
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 p-3 rounded-lg">
                <ShieldCheck className="size-4 text-green-500" />
                Payments are secure and encrypted.
              </div>
            </div>

            <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20" onClick={() => window.location.href = '/dashboard'}>
              Pay ${(event.ticketPrice || event.price || 0).toFixed(2)}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden sticky top-24">
              <div className="aspect-video relative">
                <img src={(event as any).poster || (event as any).image || "/placeholder-event.jpg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-lg leading-tight">{event.title}</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{format(new Date(event.date), "h:mm a")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-right max-w-[150px] truncate">{(event as any).venue || (event as any).location}</span>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span>Ticket x 1</span>
                     <span>${((event as any).ticketPrice || (event as any).price || 0).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span>Service Fee</span>
                     <span>$5.00</span>
                   </div>
                </div>

                <Separator className="bg-white/10" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(((event as any).ticketPrice || (event as any).price || 0) + 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
