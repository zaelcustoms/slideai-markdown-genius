
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Download, Wand2, Settings } from 'lucide-react';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import PreviewPane from '@/components/editor/PreviewPane';
import { useToast } from '@/hooks/use-toast';

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('Untitled Presentation');
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the presentation by ID
    // For now, we'll just set mock data
    if (id && id !== 'new') {
      // Mock fetching presentation data
      setTitle('My Awesome Presentation');
      // We'll use the initial markdown for now
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    // Mock save operation
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Saved',
        description: 'Your presentation has been saved.',
      });
    }, 800);
  };

  const enhanceWithAI = () => {
    toast({
      title: 'AI Enhancement',
      description: 'Analyzing and enhancing your presentation...',
    });
    
    // In a real app, this would call the Mistral API
    setTimeout(() => {
      toast({
        title: 'Enhanced',
        description: 'Your presentation has been enhanced with AI.',
      });
    }, 2000);
  };

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
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
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
