import { cn } from '@agri-smart/shared/lib/utils';
import { LoaderPinwheel } from 'lucide-react';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center flex-1', className)}>
      <LoaderPinwheel
        strokeWidth={1}
        className="size-6 text-destructive/50 animate-spin"
      />
    </div>
  );
};

export default Loader;
