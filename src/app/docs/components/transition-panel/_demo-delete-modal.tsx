'use client';

import { useState } from 'react';
import { TransitionPanel } from '@/components/ui/transition-panel';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DeleteUserDemo(): React.ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(1);
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveIndex(0);
  };

  const handleDelete = () => {
    setDirection(-1);
    setActiveIndex(0);
  };

  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          {activeIndex === 0
            ? 'Please review before proceeding.'
            : 'Step 2 of 2'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransitionPanel activeIndex={activeIndex} custom={direction}>
          {[
            <div key='warning'>
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
                ⚠
              </div>
              <p className='text-sm text-muted-foreground'>
                This action is <strong>permanent and irreversible</strong>. All
                your data, including projects, settings, and history, will be
                permanently deleted and cannot be recovered.
              </p>
            </div>,
            <div key='confirm'>
              <p className='mb-3 text-sm text-muted-foreground'>
                To confirm deletion, click the button below. This will
                immediately remove your account and all associated data.
              </p>
              <div className='rounded-md border border-destructive/20 bg-destructive/5 p-3'>
                <p className='text-xs text-destructive'>
                  You are about to delete user <strong>john@example.com</strong>
                  . This cannot be undone.
                </p>
              </div>
            </div>,
          ]}
        </TransitionPanel>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {activeIndex === 0 ? (
          <>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
            <Button variant='destructive' size='sm' onClick={handleNext}>
              Continue
            </Button>
          </>
        ) : (
          <>
            <Button variant='outline' size='sm' onClick={handleBack}>
              Go Back
            </Button>
            <Button variant='destructive' size='sm' onClick={handleDelete}>
              Delete Account
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
