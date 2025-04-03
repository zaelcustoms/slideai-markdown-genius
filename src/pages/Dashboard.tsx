
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileText, Clock, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock data for presentations
const mockPresentations = [
  {
    id: '1',
    title: 'Introduction to React',
    lastEdited: '2 hours ago',
    slides: 12,
    thumbnail: null
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    lastEdited: '2 days ago',
    slides: 24,
    thumbnail: null
  },
  {
    id: '3',
    title: 'Web Performance Optimization',
    lastEdited: '1 week ago',
    slides: 18,
    thumbnail: null
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [presentations] = useState(mockPresentations);

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Manage and create your presentations</p>
        </div>
        <Button onClick={() => navigate('/editor/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Presentation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="border-dashed border-2 bg-transparent hover:bg-secondary/10 transition-colors cursor-pointer group" onClick={() => navigate('/editor/new')}>
          <CardContent className="flex flex-col items-center justify-center h-64 p-6">
            <PlusCircle className="h-12 w-12 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
            <p className="text-lg font-medium">Create New Presentation</p>
            <p className="text-muted-foreground text-center mt-2">
              Start with a blank canvas or choose a template
            </p>
          </CardContent>
        </Card>

        {presentations.map((presentation) => (
          <Card key={presentation.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
              <FileText className="h-12 w-12 text-primary/60" />
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">{presentation.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {presentation.lastEdited} • {presentation.slides} slides
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-2 flex justify-between">
              <Button size="sm" variant="ghost" onClick={() => navigate(`/editor/${presentation.id}`)}>
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Star className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-secondary/30 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium mb-2">Upgrade to Pro</h2>
            <p className="text-muted-foreground">
              Get unlimited presentations, advanced AI features, and more.
            </p>
          </div>
          <Button variant="default" asChild>
            <Link to="/pricing">See Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
