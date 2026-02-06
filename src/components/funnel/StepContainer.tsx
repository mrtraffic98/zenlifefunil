import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StepContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
  textAlign?: 'center' | 'left';
}

export const StepContainer = ({
  title,
  subtitle,
  children,
  className,
  centered = false,
  textAlign = 'center',
}: StepContainerProps) => {
  return (
    <div className={cn(
      "flex-1 px-5 pb-24 pt-2 animate-slide-up overflow-y-auto flex flex-col justify-center",
      className
    )}>
      <div className="max-w-sm mx-auto w-full">
        {(title || subtitle) && (
          <div className={cn("mb-5", textAlign === 'center' ? 'text-center' : 'text-left')}>
            {title && (
              <h1 className="text-xl leading-tight mb-1.5 tracking-tight text-foreground font-extrabold">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-snug font-normal">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
