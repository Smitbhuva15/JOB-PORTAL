import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm p-8 transition-all hover:shadow-md mt-6">
      {Icon && (
        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <div className="text-foreground text-center text-xl font-bold font-heading">
        {title}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-sm text-center">
          {description}
        </p>
      )}
      {buttonText && onClick && (
        <Button 
          onClick={onClick} 
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-primary/90 transition-all hover:shadow-primary/25"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
