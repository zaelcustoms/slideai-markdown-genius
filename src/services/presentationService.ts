
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Presentation {
  id: string;
  title: string;
  markdown: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type NewPresentation = Pick<Presentation, "title" | "markdown">;

// Fetch all presentations for the current user
export const useGetPresentations = () => {
  return useQuery({
    queryKey: ['presentations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching presentations:', error);
        throw new Error(error.message);
      }
      
      return data as Presentation[];
    }
  });
};

// Fetch a single presentation by ID
export const useGetPresentation = (id: string) => {
  return useQuery({
    queryKey: ['presentations', id],
    queryFn: async () => {
      if (id === 'new') {
        return null;
      }
      
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching presentation ${id}:`, error);
        throw new Error(error.message);
      }
      
      return data as Presentation;
    },
    enabled: id !== 'new',
  });
};

// Create a new presentation
export const useCreatePresentation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newPresentation: NewPresentation) => {
      const { data, error } = await supabase
        .from('presentations')
        .insert([newPresentation])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating presentation:', error);
        throw new Error(error.message);
      }
      
      return data as Presentation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast.success('Presentation created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create presentation: ${error.message}`);
    }
  });
};

// Update an existing presentation
export const useUpdatePresentation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, presentation }: { id: string, presentation: Partial<Presentation> }) => {
      const { data, error } = await supabase
        .from('presentations')
        .update(presentation)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating presentation ${id}:`, error);
        throw new Error(error.message);
      }
      
      return data as Presentation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      queryClient.invalidateQueries({ queryKey: ['presentations', data.id] });
      toast.success('Presentation saved successfully');
    },
    onError: (error) => {
      toast.error(`Failed to save presentation: ${error.message}`);
    }
  });
};

// Delete a presentation
export const useDeletePresentation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('presentations')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting presentation ${id}:`, error);
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      toast.success('Presentation deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete presentation: ${error.message}`);
    }
  });
};
