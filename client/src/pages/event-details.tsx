import { Layout } from "@/components/Layout";
import { EVENTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Share2, Heart, Ticket, User, Info, ChevronLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function EventDetails() {
  const [match, params] = useRoute("/event/:id");
  const event = EVENTS.find(e => e.id === params?.id);

  if (!event) return <div>Event not found</div>;

  return (
    <Layout>
      <div className="relative">
        {/* Hero Image Background */}
        <div className="h-[50vh] w-full relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute top-6 left-0 right-0 container mx-auto px-4 z-10">
            <Link href="/explore">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-md gap-2">
                <ChevronLeft className="size-4" /> Back to Browse
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Badge className="mb-4 bg-primary hover:bg-primary text-white border-0 px-3 py-1">{event.category}</Badge>
                <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <User className="size-4 text-secondary" />
                    <span className="font-medium">By {event.organizer}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <Ticket className="size-4 text-secondary" />
                    <span className="font-medium">{event.attendees} attending</span>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                    <Info className="size-5 text-primary" /> About Event
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                <Separator className="bg-white/10" />
                
                {/* Example of more content */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Tags</h3>
                  <div className="flex gap-2 flex-wrap">
                    {["Music", "Live", "Concert", "Nightlife", "Social"].map(tag => (
                      <Badge key={tag} variant="outline" className="border-white/10 hover:bg-white/5 px-4 py-1.5 text-sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">Price</p>
                     <h2 className="text-4xl font-bold text-white">${event.price}</h2>
                   </div>
                   <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/10">
                     <Heart className="size-5" />
                   </Button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Calendar className="size-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Date & Time</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.date), "h:mm a")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <MapPin className="size-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/checkout/${event.id}`}>
                  <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/20">
                    Book Ticket Now
                  </Button>
                </Link>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure payment processed by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
