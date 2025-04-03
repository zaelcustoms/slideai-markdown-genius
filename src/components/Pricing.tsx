
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: [
      '3 presentations',
      '20 slides per presentation',
      '5 basic themes',
      'Basic AI enhancements',
      'PDF & Web export',
      'Community support'
    ],
    cta: 'Sign Up',
    ctaLink: '/signup',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '15',
    description: 'For professionals and educators',
    features: [
      'Unlimited presentations',
      'Unlimited slides',
      'All themes',
      'Advanced AI enhancements',
      'PDF, Web & PPTX export',
      'Collaboration (up to 5 editors)',
      '10GB storage',
      'Email support'
    ],
    cta: 'Get Started',
    ctaLink: '/signup?plan=pro',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Custom themes',
      'Prioritized AI processing',
      'Unlimited editors',
      '100GB storage',
      'Dedicated support',
      'SSO & advanced security',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlighted: false
  }
];

const Pricing = () => {
  return (
    <div className="py-20 container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold gradient-heading mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the plan that best fits your needs. All plans include core features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`border rounded-lg overflow-hidden ${plan.highlighted 
              ? 'border-primary bg-secondary/40 shadow-lg shadow-primary/10' 
              : 'border-border bg-background'}`}
          >
            {plan.highlighted && (
              <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">
                  {plan.price === 'Custom' ? '' : '$'}{plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground ml-1">/month</span>
                )}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted ? '' : 'bg-secondary hover:bg-secondary/80'}`}
                variant={plan.highlighted ? 'default' : 'outline'} 
                asChild
              >
                <Link to={plan.ctaLink}>{plan.cta}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
