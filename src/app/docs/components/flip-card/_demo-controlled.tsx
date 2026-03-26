'use client';

import { useState } from 'react';
import { FlipCard } from '@/components/ui/flip-card';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const FlipCardControlledDemo = (): React.ReactNode => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className='flex flex-col items-center gap-4'>
      <FlipCard
        className='h-70 w-75'
        isFlipped={flipped}
        front={
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Front Face</CardTitle>
              <CardDescription>Click the button to flip.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                This is the front side of the card.
              </p>
            </CardContent>
          </Card>
        }
        back={
          <Card className='h-full bg-primary text-primary-foreground'>
            <CardHeader>
              <CardTitle>Back Face</CardTitle>
              <CardDescription className='text-primary-foreground/70'>
                Controlled via state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-primary-foreground/70'>
                The flip is driven by <code>isFlipped</code>.
              </p>
            </CardContent>
          </Card>
        }
      />
      <Button onClick={() => setFlipped((f) => !f)}>
        {flipped ? 'Show Front' : 'Show Back'}
      </Button>
    </div>
  );
};
