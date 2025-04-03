
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-background via-secondary/50 to-background">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold gradient-heading">
            Ready to Transform Your Presentations?
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Join thousands of developers, technical professionals, and educators who use SlideAI
            to create beautiful presentations from Markdown.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/demo">See a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
