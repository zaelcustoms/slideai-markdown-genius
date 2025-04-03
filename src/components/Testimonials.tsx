
import React from 'react';

const testimonials = [
  {
    quote: "SlideAI has changed how I create presentations for my team. The AI suggestions take my content to the next level.",
    author: "Alex Chen",
    role: "Engineering Lead",
    company: "TechCorp"
  },
  {
    quote: "As an educator, I need to create slides quickly. SlideAI lets me focus on content while handling the design beautifully.",
    author: "Dr. Sarah Johnson",
    role: "Computer Science Professor",
    company: "University of Technology"
  },
  {
    quote: "The code highlighting and LaTeX support is perfect for technical presentations. It's now my go-to tool.",
    author: "Michael Rodriguez",
    role: "Senior Developer",
    company: "DataSystems"
  }
];

const Testimonials = () => {
  return (
    <div className="bg-background py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold gradient-heading mb-4">
            Loved by Technical Professionals
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from developers, educators, and content creators who use SlideAI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-secondary/30 border border-border rounded-lg p-6 relative"
            >
              <div className="mb-4 text-4xl text-primary/30">"</div>
              <p className="mb-6 relative z-10">{testimonial.quote}</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
