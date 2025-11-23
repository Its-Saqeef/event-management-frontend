export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-lg mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">EventHorizon</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The next generation event management platform. Discover, book, and experience the future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Organizers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 EventHorizon. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
