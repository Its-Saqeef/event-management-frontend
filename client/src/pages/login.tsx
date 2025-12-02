import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/Auth/AuthContext";
import { useToast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {login} = useAuth()
   const { toast } = useToast();
   const [,setLocation]=useLocation()

  const loginMutation = useMutation({
    mutationFn : async (values: z.infer<typeof loginSchema>) =>{
        await login(values.email,values.password)
    },
     onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been logged in successfully.",
      });
      form.reset();
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  })
  
  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block bg-muted">
        <img 
          src="/attached_assets/generated_images/abstract_neon_liquid_waves_background.png" 
          alt="Login Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute bottom-10 left-10 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 max-w-md">
          <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
          <p className="text-gray-300">Manage your events, tickets, and notifications in one place.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-heading font-bold">Sign In</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" className="h-12 bg-white/5 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••" className="h-12 bg-white/5 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 font-bold">Sign In</Button>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
