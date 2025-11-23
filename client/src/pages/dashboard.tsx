import { Layout } from "@/components/Layout";
import { EVENTS } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, QrCode, Download, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  // Mock booked tickets (using first event as a booked one)
  const bookedEvent = EVENTS[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex</p>
          </div>
          <div className="flex gap-2">
             {/* Placeholder for any dashboard actions */}
          </div>
        </div>

        <Tabs defaultValue="tickets" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-xl">
            <TabsTrigger value="tickets" className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-primary data-[state=active]:text-white">My Tickets</TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-primary data-[state=active]:text-white">Saved Events</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg px-6 py-2 text-base data-[state=active]:bg-primary data-[state=active]:text-white">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ticket Component */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-card border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row">
                   <div className="md:w-1/3 relative h-48 md:h-auto">
                     <img src={bookedEvent.image} className="w-full h-full object-cover" alt="Event" />
                     <div className="absolute inset-0 bg-black/20" />
                   </div>
                   <div className="md:w-2/3 p-6 flex flex-col justify-between">
                     <div>
                       <div className="flex justify-between items-start mb-2">
                         <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">Upcoming</Badge>
                         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="size-4" /></Button>
                       </div>
                       <h3 className="text-xl font-bold mb-1">{bookedEvent.title}</h3>
                       <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
                         <MapPin className="size-3" /> {bookedEvent.location}
                       </p>
                       
                       <div className="flex gap-4 text-sm mb-4">
                         <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                           <Calendar className="size-4 text-primary" />
                           {format(new Date(bookedEvent.date), "MMM d, yyyy")}
                         </div>
                         <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                           <Clock className="size-4 text-primary" />
                           {format(new Date(bookedEvent.date), "h:mm a")}
                         </div>
                       </div>
                     </div>

                     <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                       <Button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10">
                         <QrCode className="mr-2 size-4" /> View QR
                       </Button>
                       <Button variant="outline" size="icon" className="border-white/10">
                         <Download className="size-4" />
                       </Button>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
             <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl bg-white/5">
               <p className="text-muted-foreground">No saved events yet.</p>
               <Button variant="link" className="text-primary">Explore Events</Button>
             </div>
          </TabsContent>
          
          <TabsContent value="notifications">
             <div className="space-y-4 max-w-3xl">
               {[1, 2].map((i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 items-start">
                   <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                     <Calendar className="size-5 text-primary" />
                   </div>
                   <div>
                     <h4 className="font-bold">Event Reminder</h4>
                     <p className="text-sm text-muted-foreground mt-1">
                       Don't forget! {bookedEvent.title} is coming up in 2 days. Get ready for an amazing experience.
                     </p>
                     <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                   </div>
                 </div>
               ))}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
