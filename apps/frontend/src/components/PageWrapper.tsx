import { cn } from '@agri-smart/shared/lib/utils';

export type PageSectionProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string; // unified className
  titleClassName?: string;
};

const PageWrapper = ({
  title,
  children,
  className = '',
  titleClassName = '',
}: PageSectionProps) => (
  <div className={cn('p-6', className)}>
    {typeof title === 'string' ? (
      <span
        className={cn(
          'flex mb-6 text-3xl font-bold tracking-tight w-full  text-start',
          titleClassName
        )}
      >
        {title}
      </span>
    ) : (
      title
    )}
    {children}
  </div>
);
export default PageWrapper;
