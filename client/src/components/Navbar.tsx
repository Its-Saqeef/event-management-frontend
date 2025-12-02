import { Link, useLocation } from "wouter";
import { Search, User, Ticket, Calendar, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {useAuth} from "@/components/Auth/AuthContext";

export function Navbar() {
  const [location] = useLocation();
 const { user ,logout} = useAuth();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <Ticket className="text-white size-4" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">EventHorizon</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/explore">Explore</NavLink>
            {user?.role === "organizer" && <NavLink href="/organizer">Organize</NavLink>}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src={user.avatar} alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-white/10 text-foreground" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'} className="cursor-pointer focus:bg-primary/20 focus:text-primary">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>{user.role === "organizer" ? "My Events" : "My Tickets"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'} className="cursor-pointer focus:bg-primary/20 focus:text-primary">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Saved Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-400 focus:bg-red-900/20 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-white/5 hover:text-primary">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white border-0 shadow-lg shadow-primary/20">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] glass-card border-l border-white/10 bg-background/95">
              <div className="flex flex-col gap-8 mt-8">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium hover:text-primary">Home</Link>
                  <Link href="/explore" className="text-lg font-medium hover:text-primary">Explore</Link>
                  <Link href="/organizer" className="text-lg font-medium hover:text-primary">Organize</Link>
                </nav>
                <div className="flex flex-col gap-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10">Log in</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">Sign up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
