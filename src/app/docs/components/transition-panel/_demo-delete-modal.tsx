'use client';

import { useState } from 'react';
import { TransitionPanel } from '@/components/ui/transition-panel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteUserDemo(): React.ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(1);
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveIndex(0);
  };

  const handleDelete = () => {
    setOpen(false);
    setActiveIndex(0);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setActiveIndex(0);
      setDirection(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='destructive'>Delete Account</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            {activeIndex === 0
              ? 'Please review before proceeding.'
              : 'Step 2 of 2'}
          </DialogDescription>
        </DialogHeader>
        <TransitionPanel activeIndex={activeIndex} custom={direction}>
          {[
            <div key='warning'>
              <span className='text-sm text-muted-foreground'>
                This action is <strong>permanent and irreversible</strong>. All
                your data, including projects, settings, and history, will be
                permanently deleted and cannot be recovered.
              </span>
            </div>,
            <div key='confirm'>
              <span className='mb-3 block text-sm text-muted-foreground'>
                To confirm deletion, click the button below. This will
                immediately remove your account and all associated data.
              </span>
              <div className='rounded-md border border-destructive/20 bg-destructive/5 p-3'>
                <span className='text-xs text-destructive'>
                  You are about to delete user <strong>john@example.com</strong>
                  . This cannot be undone.
                </span>
              </div>
            </div>,
          ]}
        </TransitionPanel>
        <DialogFooter className='flex-row justify-between sm:justify-between'>
          {activeIndex === 0 ? (
            <>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setOpen(false)}
              >
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
