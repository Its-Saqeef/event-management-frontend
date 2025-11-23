import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CATEGORIES } from "@/lib/mock-data";

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Location is required"),
  category: z.string(),
  price: z.string().transform((val) => parseFloat(val)),
  date: z.date(),
});

export default function Organizer() {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log(values);
    alert("Event Created! (Mock)");
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Create Event</h1>
          <p className="text-muted-foreground">Share your event with the world.</p>
        </div>

        <Card className="border-white/10 bg-card/50 backdrop-blur-md">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Neon Nights Music Festival" className="h-12 bg-white/5 border-white/10 text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-white/5 border-white/10">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.filter(c => c !== "All").map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-12 w-full pl-3 text-left font-normal border-white/10 bg-white/5 hover:bg-white/10",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Venue name or address" className="h-12 bg-white/5 border-white/10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell people what your event is about..." 
                          className="min-h-[150px] bg-white/5 border-white/10 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" className="h-12 bg-white/5 border-white/10" {...field} />
                      </FormControl>
                      <FormDescription>Set to 0 for free events</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-6 border border-dashed border-white/20 rounded-xl bg-white/5 text-center cursor-pointer hover:bg-white/10 transition-colors">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium">Upload Event Image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" type="button" className="h-12 px-8 border-white/10">Cancel</Button>
                  <Button type="submit" className="h-12 px-8 bg-primary text-white font-bold hover:bg-primary/90">Create Event</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
