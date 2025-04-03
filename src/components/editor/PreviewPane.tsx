
import React from 'react';

interface PreviewPaneProps {
  markdown: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ markdown }) => {
  // Split markdown into slides based on "---" separator
  const slides = markdown.split(/^---$/m).filter(slide => slide.trim() !== '');
  
  // Get the current slide (for now just show the first one or a placeholder)
  const currentSlide = slides.length > 0 ? slides[0] : '# Welcome to SlideAI\n\nStart typing in the editor to create your presentation';

  // Basic function to convert markdown to HTML (very simplified)
  const convertMarkdownToHtml = (md: string) => {
    // This is a very simplified markdown parser for demonstration
    // In a real app, you'd use a library like marked or remark
    let html = md
      // Convert headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Convert bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert lists
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      // Wrap lists
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    return html;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-secondary/40 border-b border-border p-2 rounded-t-md flex items-center">
        <h3 className="text-sm font-medium">Preview</h3>
      </div>
      <div className="flex-1 bg-gray-50 p-6 rounded-b-md overflow-auto flex items-center justify-center">
        <div className="slide-container w-full max-w-3xl mx-auto">
          <div 
            className="w-full h-full p-8"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(currentSlide) }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
