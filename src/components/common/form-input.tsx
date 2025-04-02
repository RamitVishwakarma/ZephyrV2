import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  name: string;
  type?: string;
  label?: string;
  itemLabel?: string;
  placeholder?: string;
  info?: string;
  onInputChange?: (...event: any) => void;
  description?: React.ReactNode | string;
  isAsterisk?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  showError?: boolean;
  enableCopyText?: boolean;
  [key: string]: any;
}

const FormInput: React.FC<FormInputProps> = memo(
  ({
    name,
    type = 'text',
    label = '',
    placeholder = '',
    onInputChange = () => {},
    className = '',
    containerClassName = '',
    disabled = false,
    ...rest
  }) => {
    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <FormItem aria-disabled={disabled} className={`w-full ${containerClassName}`}>
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
                <div className="relative">
                  <Input
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    {...field}
                    {...rest}
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      onInputChange(e.target.value);
                    }}
                    disabled={disabled}
                    className={className}
                  />
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
