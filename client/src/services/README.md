# API Services Documentation

This directory contains React Query-based API services for making HTTP requests across the application.

## Structure

- `lib/api-client.ts` - Axios instance with interceptors
- `lib/api-service.ts` - Base React Query hooks and utilities
- `services/*.ts` - Domain-specific service files

## Usage Examples

### Using Query Hooks (GET requests)

```tsx
import { useEvents, useEvent } from '@/services';

function EventsList() {
  const { data: events, isLoading, error } = useEvents();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {events?.map(event => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
}

function EventDetails({ eventId }: { eventId: string }) {
  const { data: event, isLoading } = useEvent(eventId);
  
  // ...
}
```

### Using Mutation Hooks (POST, PUT, PATCH, DELETE)

```tsx
import { useCreateEvent, useUpdateEvent, useDeleteEvent } from '@/services';
import { useToast } from '@/hooks/use-toast';

function CreateEventForm() {
  const { toast } = useToast();
  const createEvent = useCreateEvent();
  
  const handleSubmit = async (data: CreateEventData) => {
    try {
      await createEvent.mutateAsync(data);
      toast({
        title: "Success!",
        description: "Event created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### With Query Invalidation

```tsx
import { useCreateEvent } from '@/services';
import { useQueryClient } from '@tanstack/react-query';
import { eventKeys } from '@/services/event-service';

function CreateEvent() {
  const queryClient = useQueryClient();
  const createEvent = useCreateEvent();
  
  const handleSubmit = async (data: CreateEventData) => {
    await createEvent.mutateAsync(data, {
      onSuccess: () => {
        // Invalidate and refetch events list
        queryClient.invalidateQueries({ queryKey: eventKeys.all });
      },
    });
  };
}
```

## Creating New Services

1. Create a new file in `services/` directory (e.g., `ticket-service.ts`)
2. Define your types and query keys
3. Create hooks using the base utilities:

```tsx
import { useApiQuery, useApiMutation } from '@/lib/api-service';

export const ticketKeys = {
  all: ['tickets'] as const,
  detail: (id: string) => [...ticketKeys.all, id] as const,
};

export function useTickets() {
  return useApiQuery<Ticket[]>(
    ticketKeys.all,
    '/api/tickets'
  );
}

export function useCreateTicket() {
  return useApiMutation<Ticket, CreateTicketData>(
    '/api/tickets'
  );
}
```

4. Export from `services/index.ts`

## Error Handling

All hooks use the `ApiError` type. Use the `getErrorMessage` utility:

```tsx
import { getErrorMessage } from '@/lib/api-service';

const { error } = useEvents();
if (error) {
  const message = getErrorMessage(error);
  // Display message to user
}
```

## Query Keys Pattern

Use a factory pattern for query keys to ensure consistency:

```tsx
export const resourceKeys = {
  all: ['resource'] as const,
  lists: () => [...resourceKeys.all, 'list'] as const,
  list: (filters?: object) => [...resourceKeys.lists(), filters] as const,
  detail: (id: string) => [...resourceKeys.all, id] as const,
};
```

