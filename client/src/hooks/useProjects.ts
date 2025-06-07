import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Project, InsertProject } from '@shared/schema';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useProjects() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get all projects
  const { 
    data: projects, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.projects.getAll(),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60000 // 1 minute stale time to prevent duplicate requests
  });

  // Create new project
  const createProjectMutation = useMutation({
    mutationFn: async (project: InsertProject) => {
      return api.projects.create(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project created",
        description: "Your new project has been created successfully.",
        variant: "default"
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Update project
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, project }: { id: number, project: Partial<Project> }) => {
      return api.projects.update(id, project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
        variant: "default"
      });
      setIsModalOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Open modal for editing
  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return {
    projects,
    isLoading,
    error,
    isModalOpen,
    selectedProject,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    openEditModal,
    openCreateModal,
    closeModal
  };
}