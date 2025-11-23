import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/attached_assets/generated_images/music_concert_crowd_with_lights.png" 
          alt="Concert Crowd" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm font-medium text-primary-foreground mb-6">
            <Sparkles className="size-4 text-yellow-400" />
            <span className="text-white">The Future of Live Events is Here</span>
          </div>
        </motion.div>

        <motion.h1 
          className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-white drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Experience the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-pulse">Unforgettable</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover premier concerts, tech conferences, and art workshops. 
          Book your next memory with EventHorizon's seamless platform.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/explore">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-background hover:bg-white/90 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              Explore Events
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md font-medium">
              Create Account
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
