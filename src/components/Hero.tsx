
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="py-20 md:py-32 container">
      <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-heading">
          Transform Markdown into Beautiful Presentations
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          SlideAI uses AI to turn your Markdown documents into professional presentations
          in seconds. Perfect for developers, technical writers, and educators.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started — It's Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/features">See How It Works</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24 relative">
        <div className="overflow-hidden rounded-lg border border-border shadow-xl bg-gradient-to-br from-secondary to-background">
          <div className="p-2 md:p-4">
            {/* Browser mockup */}
            <div className="rounded border border-border bg-background/50 shadow-lg">
              <div className="flex items-center border-b border-border p-2">
                <div className="flex space-x-1.5 ml-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto pr-10">
                  <div className="h-5 w-40 rounded-md bg-gray-800"></div>
                </div>
              </div>
              
              {/* Editor and Preview mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                <div className="bg-gray-900 rounded-md p-3 shadow-sm h-64 md:h-80 overflow-hidden">
                  <pre className="text-sm text-gray-300 font-mono">
                    <code>
{`# Welcome to SlideAI

## Transform Markdown to Slides

- Write in **Markdown**
- Get beautiful slides
- Enhance with AI

---

## Features

- Code highlighting
- Math equations
- Diagrams
- AI enhancements`}
                    </code>
                  </pre>
                </div>
                
                <div className="h-64 md:h-80 bg-white rounded-md shadow-sm p-3 flex items-center justify-center overflow-hidden">
                  <div className="slide-container w-full h-full flex flex-col justify-center p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Code highlighting
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Math equations
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Diagrams
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        AI enhancements
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Hero;
