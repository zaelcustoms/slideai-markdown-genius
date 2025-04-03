
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Download, Wand2, Settings, Loader2 } from 'lucide-react';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import PreviewPane from '@/components/editor/PreviewPane';
import { useToast } from '@/hooks/use-toast';
import { 
  useGetPresentation, 
  useCreatePresentation, 
  useUpdatePresentation 
} from '@/services/presentationService';

const initialMarkdown = `# Welcome to SlideAI

## Create beautiful presentations with Markdown

- Write in **Markdown**
- Get beautiful slides
- Enhanced by AI

---

## Features

- Code highlighting
- Math equations
- Diagrams
- AI enhancements

\`\`\`javascript
// Here's some code
function greet() {
  return "Hello, world!";
}
\`\`\`

---

## Get Started

1. Write your content in Markdown
2. Use --- to separate slides
3. Use AI to enhance your presentation
4. Export and share`;

const Editor = () => {
  const { id = 'new' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('Untitled Presentation');
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch presentation data from Supabase
  const { data: presentation, isLoading, isError, error } = useGetPresentation(id);

  // Mutations
  const createPresentation = useCreatePresentation();
  const updatePresentation = useUpdatePresentation();

  useEffect(() => {
    if (id === 'new') {
      setTitle('Untitled Presentation');
      setMarkdown(initialMarkdown);
      setIsInitialized(true);
      return;
    }

    if (presentation && !isInitialized) {
      setTitle(presentation.title);
      setMarkdown(presentation.markdown);
      setIsInitialized(true);
    }
  }, [id, presentation, isInitialized]);

  const handleSave = async () => {
    try {
      if (id === 'new') {
        const newPresentation = await createPresentation.mutateAsync({
          title,
          markdown
        });
        navigate(`/editor/${newPresentation.id}`, { replace: true });
      } else {
        await updatePresentation.mutateAsync({
          id,
          presentation: { title, markdown }
        });
      }
    } catch (error) {
      console.error('Error saving presentation:', error);
    }
  };

  const handleDownload = () => {
    // Create a Blob with the markdown content
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^\w\s]/gi, '')}.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Download started',
      description: `${title}.md is being downloaded`,
    });
  };

  const enhanceWithAI = () => {
    toast({
      title: 'AI Enhancement',
      description: 'This feature is coming soon!',
    });
  };

  if (isLoading && id !== 'new') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        <p className="ml-4 text-muted-foreground">Loading presentation...</p>
      </div>
    );
  }

  if (isError && id !== 'new') {
    return (
      <div className="container py-8">
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-destructive">Error loading presentation</h2>
          <p className="text-sm text-destructive/80 mt-1">{error?.message || 'An unknown error occurred'}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isSaving = createPresentation.isPending || updatePresentation.isPending;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-transparent hover:border-input focus:border-input text-lg font-medium h-9 w-60"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={enhanceWithAI}>
              <Wand2 className="h-4 w-4 mr-2" />
              Enhance with AI
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container my-6">
        <Tabs defaultValue="editor" className="h-[calc(100vh-12rem)]">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="h-full">
            <div className="editor-container h-full">
              <MarkdownEditor initialValue={markdown} onChange={setMarkdown} />
              <PreviewPane markdown={markdown} />
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="h-full">
            <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg p-8">
              <div className="slide-container w-full max-w-4xl">
                <PreviewPane markdown={markdown} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Editor;
