
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, FileText, Edit, Trash2 } from 'lucide-react';

// Dummy data for presentations (replace with actual data from Supabase later)
const dummyPresentations = [
  { id: '1', title: 'Introduction to React', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'Advanced TypeScript', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', title: 'Web Performance Tips', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState(dummyPresentations);
  const [newPresTitle, setNewPresTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const createPresentation = () => {
    if (!newPresTitle.trim()) return;
    
    // In a real app, you would create the presentation in Supabase here
    const newPresentation = {
      id: Date.now().toString(),
      title: newPresTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPresentations([newPresentation, ...presentations]);
    setNewPresTitle('');
    setDialogOpen(false);
    
    // Navigate to the editor for the new presentation
    navigate(`/editor/${newPresentation.id}`);
  };

  const deletePresentation = (id: string) => {
    // In a real app, you would delete from Supabase here
    setPresentations(presentations.filter(pres => pres.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={createPresentation}>Create</Button>
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
                  Created: {formatDate(presentation.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 pb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Last updated: {formatDate(presentation.updatedAt)}
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
                  onClick={() => deletePresentation(presentation.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
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
