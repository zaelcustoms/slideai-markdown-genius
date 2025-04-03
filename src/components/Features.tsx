
import React from 'react';
import { FileText, Zap, Code, PenTool, Share2, CloudLightning } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Markdown Simplicity',
    description: 'Create slides using familiar Markdown syntax with live preview.'
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'AI Enhancement',
    description: 'Let AI improve your content, suggest designs, and optimize slides.'
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Developer Experience',
    description: 'Enjoy full code highlighting, diagrams, and LaTeX support.'
  },
  {
    icon: <CloudLightning className="h-8 w-8 text-primary" />,
    title: 'Web-Based',
    description: 'No installation required. Create presentations from any browser.'
  },
  {
    icon: <PenTool className="h-8 w-8 text-primary" />,
    title: 'Beautiful Themes',
    description: 'Choose from professional themes or customize your own.'
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Easy Sharing',
    description: 'Export to PDF, PPTX, or share via link with presenter mode.'
  }
];

const Features = () => {
  return (
    <div className="bg-secondary/30 py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold gradient-heading mb-4">
            All the Features You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            SlideAI combines the simplicity of Markdown with the power of AI to create
            stunning presentations for technical professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-secondary inline-flex rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
