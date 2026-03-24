'use client';

import { ConfettiWrapper } from '@/components/ui/confetti-wrapper';
import { Button } from '@/components/ui/button';

export const ConfettiOnClickDemo = (): React.ReactNode => {
  return (
    <ConfettiWrapper>
      <Button onClick={() => alert('Clicked!')}>With onClick</Button>
    </ConfettiWrapper>
  );
};
