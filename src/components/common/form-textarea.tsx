import React, { memo, KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { Textarea } from '../ui/textarea';

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  onInputChange?: (...event: any) => void;
  description?: React.ReactNode | string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  showError?: boolean;
  handleKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea: React.FC<FormInputProps> = memo(
  ({
    name,
    label = '',
    placeholder = 'Enter',
    onInputChange = () => {},
    description,
    className = '',
    disabled = false,
    showError = true,
    rows = 2,
    handleKeyDown = () => {},
  }) => {
    const { control, handleSubmit } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <FormItem aria-disabled={disabled}>
              {label && (
                <FormLabel htmlFor={name}>
                  <div className="flex flex-row items-center">
                    <p className="text-dp-secondary-foreground mr-[4px] text-[12px] font-medium">
                      {label}
                    </p>
                  </div>
                </FormLabel>
              )}
              <FormControl>
                <Textarea
                  id={name}
                  placeholder={placeholder}
                  {...field}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    onInputChange(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                  className={cn(
                    'focus-visible:ring-1 focus-visible:ring-offset-0 aria-[invalid=true]:border-[#3D3F40] aria-[invalid=true]:ring-[#3D3F40]',
                    className
                  )}
                  rows={rows}
                />
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              {showError && <FormMessage />}
            </FormItem>
          );
        }}
      />
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
