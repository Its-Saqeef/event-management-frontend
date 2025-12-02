import { useApiQuery, useApiMutation, useApiPut, useApiDelete } from '@/lib/api-service';
import { ApiError } from '@/lib/api-service';

// Event types
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  poster: string;
  capacity: number;
  ticketPrice: number;
  organizer: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  poster?: string;
  capacity: number;
  ticketPrice: number;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

// Query keys factory
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...eventKeys.lists(), filters] as const,
  detail: (id: string) => [...eventKeys.all, id] as const,
  bySlug: (slug: string) => [...eventKeys.all, 'slug', slug] as const,
  byOrganizer: (organizerId: string) => [...eventKeys.all, 'organizer', organizerId] as const,
  myEvents: () => [...eventKeys.all, 'my-events'] as const,
};

// Hooks for event operations

// Get all events
export function useEvents(filters?: Record<string, unknown>) {
  const queryParams = filters ? new URLSearchParams(filters as Record<string, string>).toString() : '';
  const url = queryParams ? `/api/events?${queryParams}` : '/api/events';
  
  return useApiQuery<Event[], ApiError>(
    eventKeys.list(filters),
    url,
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
}

// Get event by ID
export function useEvent(eventId: string) {
  return useApiQuery<Event, ApiError>(
    eventKeys.detail(eventId),
    `/api/events/${eventId}`,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Get event by slug
export function useEventBySlug(slug: string) {
  return useApiQuery<Event, ApiError>(
    eventKeys.bySlug(slug),
    `/api/events/${slug}`,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Get events by organizer
export function useEventsByOrganizer(organizerId: string) {
  return useApiQuery<Event[], ApiError>(
    eventKeys.byOrganizer(organizerId),
    `/api/events/organizer/${organizerId}`
  );
}

// Get logged-in user's events
export function useMyEvents() {
  return useApiQuery<Event[], ApiError>(
    eventKeys.myEvents(),
    '/api/events/my-events',
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
}

// Create event mutation
export function useCreateEvent() {
  return useApiMutation<Event, CreateEventData, ApiError>(
    '/api/events',
    {
      onSuccess: () => {
        // Invalidate events list
        // This will be handled by the mutation hook
      },
    }
  );
}

// Update event mutation
export function useUpdateEvent(eventId: string) {
  return useApiPut<Event, UpdateEventData, ApiError>(
    `/api/events/${eventId}`,
    {
      onSuccess: () => {
        // Invalidate both the detail and list queries
      },
    }
  );
}

// Delete event mutation
export function useDeleteEvent() {
  return useApiDelete<ApiError>(
    '/api/events',
    {
      onSuccess: () => {
        // Invalidate events list
      },
    }
  );
}

