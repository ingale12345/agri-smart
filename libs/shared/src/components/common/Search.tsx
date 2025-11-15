import { Input } from '@agri-smart/shared/components/ui/input';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@agri-smart/shared/lib/utils';
import type { ComponentProps } from 'react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface SearchProps extends Omit<ComponentProps<typeof Input>, 'className'> {
  className?: string;
}

const Search = ({
  placeholder,
  className,
  value,
  onChange,
  ...inputProps
}: SearchProps) => {
  const { t } = useTranslation();
  const searchPlaceholder = placeholder || t('search');
  const handleClear = () => {
    if (onChange) {
      // Create a synthetic event to clear the input
      const syntheticEvent = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={cn('relative', className ? className : 'ms-auto')}>
      <SearchIcon
        strokeWidth={2.5}
        className="absolute top-1/2 -translate-y-1/2 left-2 size-3 text-destructive/50"
      />
      <Input
        placeholder={searchPlaceholder}
        value={value}
        onChange={onChange}
        className={cn(
          'min-w-60 h-8.25 md:text-2xs font-medium ps-6 pe-8 py-1 border-gray-200 rounded-md shadow-sm focus-visible:ring-0 focus-visible:ring-transparent',
          className
        )}
        {...inputProps}
      />
      {value && (
        <Button
          type="button"
          size="icon"
          onClick={handleClear}
          className="absolute top-1/2 -translate-y-1/2 right-1 size-6 rounded-full flex items-center justify-center text-destructive/50 hover:text-destructive hover:bg-destructive/10 transition-all"
          aria-label={`${t('clear')} ${t('search')}`}
        >
          <X strokeWidth={2.5} className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default Search;
