import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { EVENTS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/services/event-service";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const featuredEvents = EVENTS.slice(0, 3);
  const { data: events, isLoading, error } = useEvents();
  

  if(isLoading) {
    return <Spinner />
  }
  if(error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <Hero />
      
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Trending Events</h2>
            <p className="text-muted-foreground max-w-2xl">
              Don't miss out on the most popular experiences happening this week.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="link" className="text-primary hidden md:flex gap-2 group">
              View all events <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0,3).map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link href="/explore">
            <Button variant="outline" className="w-full border-white/10">
              View all events
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Why Choose EventHorizon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Secure Booking</h3>
              <p className="text-muted-foreground">Bank-grade security for all your transactions. Your data is always protected.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="size-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Exclusive Access</h3>
              <p className="text-muted-foreground">Get early access to VIP tickets and special events before anyone else.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="size-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Z"/><path d="M8 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Z"/><path d="M15 7a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Z"/></svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Seamless Dashboard</h3>
              <p className="text-muted-foreground">Manage all your bookings, notifications, and payments in one place.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
