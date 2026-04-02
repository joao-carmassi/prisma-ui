'use client';

import { useState } from 'react';
import { FloatingLabel } from '@/components/ui/floating-label-input';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';

export function FieldValidationDemo(): React.ReactNode {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && value.length < 3;

  return (
    <div className='w-72'>
      <Field data-invalid={isInvalid || undefined}>
        <FloatingLabel>
          <FloatingLabel.Input
            className='bg-muted!'
            id='demo-username-validation'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={isInvalid || undefined}
          />
          <FloatingLabel.Label
            className='bg-muted'
            htmlFor='demo-username-validation'
          >
            Username
          </FloatingLabel.Label>
        </FloatingLabel>
        <FieldDescription>Must be at least 3 characters.</FieldDescription>
        {isInvalid && (
          <FieldError>Username must be at least 3 characters.</FieldError>
        )}
      </Field>
    </div>
  );
}
