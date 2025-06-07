import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Client, InsertClient } from '@shared/schema';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useClients() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Get all clients
  const { 
    data: clients, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => api.clients.getAll(),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60000 // 1 minute stale time to prevent duplicate requests
  });

  // Create new client
  const createClientMutation = useMutation({
    mutationFn: async (client: InsertClient) => {
      return api.clients.create(client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Client created",
        description: "Your new client has been added successfully.",
        variant: "default"
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error creating client:', error);
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Open modal for creating
  const openCreateModal = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  // Open modal for viewing details
  const openDetailModal = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return {
    clients,
    isLoading,
    error,
    isModalOpen,
    selectedClient,
    createClient: createClientMutation.mutate,
    isCreating: createClientMutation.isPending,
    openCreateModal,
    openDetailModal,
    closeModal
  };
}