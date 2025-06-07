import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Invoice, InsertInvoice } from '@shared/schema';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useInvoices() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Get all invoices
  const { 
    data: invoices, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/invoices'],
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60000 // 1 minute stale time to prevent duplicate requests
  });

  // Create new invoice
  const createInvoiceMutation = useMutation({
    mutationFn: async (invoice: InsertInvoice) => {
      return apiRequest('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(invoice)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/invoices'] });
      toast({
        title: "Invoice created",
        description: "Your new invoice has been created successfully.",
        variant: "default"
      });
      setIsModalOpen(false);
      setSelectedInvoice(null);
    },
    onError: (error) => {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Helper functions for invoice management
  const formatCurrency = (amount: number | string): string => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    return value.toFixed(2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusText = (invoice: Invoice): string => {
    if (invoice.status === 'paid') return 'Paid';
    
    try {
      // Safely convert Date object to string
      const dueDateStr = typeof invoice.dueDate === 'string' 
        ? invoice.dueDate 
        : invoice.dueDate.toISOString();
      
      const daysRemaining = getDaysRemaining(dueDateStr);
      if (daysRemaining < 0) return 'Overdue';
      if (daysRemaining === 0) return 'Due today';
      if (daysRemaining === 1) return 'Due tomorrow';
      return `Due in ${daysRemaining} days`;
    } catch (error) {
      return 'Due date error';
    }
  };

  // Open modal for creating a new invoice
  const openCreateModal = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  // Open modal for viewing invoice details
  const openDetailModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return {
    invoices,
    isLoading,
    error,
    isModalOpen,
    selectedInvoice,
    createInvoice: createInvoiceMutation.mutate,
    isCreating: createInvoiceMutation.isPending,
    openCreateModal,
    openDetailModal,
    closeModal,
    // Helper functions
    formatCurrency,
    formatDate,
    getStatusText
  };
}