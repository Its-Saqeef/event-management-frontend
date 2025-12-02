import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import { Event } from '@/services/event-service';

interface EventCardProps {
  event: Event & { id?: string }; // Support both _id and id for compatibility
}

export function EventCard({ event }: EventCardProps) {
  const eventSlug = event.slug || event.id || event._id;
  
  return (
    <Link href={`/event/${event.slug}`} className="block group">
      <Card className="overflow-hidden glass-card h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 border-0">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={event.poster || "/placeholder-event.jpg"} 
            alt={event.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
          <div className="absolute top-3 right-3">
              <Badge className="bg-background/50 backdrop-blur-md text-white border-white/10 hover:bg-background/70">
                {event.category}
              </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-primary font-bold flex items-center gap-2 text-sm mb-1">
              <Calendar className="size-4" />
              {format(new Date(event.date), "EEE, MMM d • h:mm a")}
            </p>
          </div>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-heading text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="size-4 shrink-0 text-secondary" />
            <span className="truncate">{event.venue}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <span className="font-bold text-lg text-white">
            ${event.ticketPrice}
          </span>
          <Button size="sm" className="bg-white/5 hover:bg-primary hover:text-white text-foreground border border-white/10 transition-all">
            Get Tickets
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
