'use client';

import { useState } from 'react';
import { TransitionPanel } from '@/components/ui/transition-panel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = [
  {
    title: 'Brand',
    description:
      'Develop a distinctive brand identity with tailored logos and guidelines to ensure consistent messaging across all platforms.',
  },
  {
    title: 'Product',
    description:
      'Design intuitive product interfaces that delight users and drive engagement through thoughtful interactions.',
  },
  {
    title: 'Launch',
    description:
      'Execute a strategic launch with coordinated marketing and communications to maximize reach.',
  },
];

export function StepCardDemo(): React.ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <Card className='w-85'>
      <CardContent>
        <TransitionPanel activeIndex={activeIndex} custom={direction}>
          {steps.map((step) => (
            <div key={step.title}>
              <h3 className='mb-2 text-lg font-medium'>{step.title}</h3>
              <p className='text-sm text-muted-foreground'>
                {step.description}
              </p>
            </div>
          ))}
        </TransitionPanel>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          variant='outline'
          size='sm'
          onClick={handlePrev}
          disabled={activeIndex === 0}
        >
          Previous
        </Button>
        <Button
          size='sm'
          onClick={handleNext}
          disabled={activeIndex === steps.length - 1}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
