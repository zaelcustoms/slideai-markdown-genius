
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, FileText, Edit, Trash2, Loader2 } from 'lucide-react';
import { 
  useGetPresentations, 
  useCreatePresentation, 
  useDeletePresentation 
} from '@/services/presentationService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newPresTitle, setNewPresTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Fetch presentations using React Query
  const { data: presentations = [], isLoading, isError, error } = useGetPresentations();
  
  // Mutations
  const createPresentation = useCreatePresentation();
  const deletePresentation = useDeletePresentation();

  const handleCreatePresentation = async () => {
    if (!newPresTitle.trim()) return;
    
    try {
      const result = await createPresentation.mutateAsync({
        title: newPresTitle,
        markdown: `# ${newPresTitle}\n\nStart typing your presentation here...\n\n---\n\n## Slide 2\n\nUse --- to separate slides`
      });
      
      setNewPresTitle('');
      setDialogOpen(false);
      
      // Navigate to the editor for the new presentation
      navigate(`/editor/${result.id}`);
    } catch (error) {
      console.error('Error creating presentation:', error);
    }
  };

  const handleDeletePresentation = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this presentation?')) {
      try {
        await deletePresentation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting presentation:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8 max-w-6xl flex flex-col items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading presentations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-destructive">Error loading presentations</h2>
          <p className="text-sm text-destructive/80 mt-1">{error?.message || 'An unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Presentations</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your Markdown presentations
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Presentation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Presentation</DialogTitle>
              <DialogDescription>
                Give your presentation a title. You can change this later.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="title">Presentation Title</Label>
              <Input
                id="title"
                value={newPresTitle}
                onChange={(e) => setNewPresTitle(e.target.value)}
                placeholder="My Awesome Presentation"
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
                disabled={createPresentation.isPending}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePresentation}
                disabled={!newPresTitle.trim() || createPresentation.isPending}
              >
                {createPresentation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {presentations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentations.map((presentation) => (
            <Card key={presentation.id} className="overflow-hidden">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl truncate" title={presentation.title}>
                  {presentation.title}
                </CardTitle>
                <CardDescription>
                  Created: {formatDate(presentation.created_at)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 pb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Last updated: {formatDate(presentation.updated_at)}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/editor/${presentation.id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => handleDeletePresentation(presentation.id, e)}
                  disabled={deletePresentation.isPending}
                >
                  {deletePresentation.isPending && deletePresentation.variables === presentation.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No presentations yet</h3>
          <p className="mt-2 text-muted-foreground">
            Create your first presentation to get started
          </p>
          <Button className="mt-4" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Presentation
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
