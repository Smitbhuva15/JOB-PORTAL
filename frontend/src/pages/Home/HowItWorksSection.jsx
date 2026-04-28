import React from 'react';

const steps = [
  {
    id: '01',
    name: 'Create an Account',
    description: 'Sign up for free and complete your professional profile with your skills, experience, and preferences.',
  },
  {
    id: '02',
    name: 'Find the Perfect Match',
    description: 'Browse thousands of listings or let our smart algorithm suggest jobs that fit your profile perfectly.',
  },
  {
    id: '03',
    name: 'Apply & Get Hired',
    description: 'Submit your application with one click, track your status, and connect directly with hiring managers.',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            How JobLinker Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Your dream job is just three simple steps away. Start your journey today.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />
            
            {steps.map((step) => (
              <div key={step.id} className="relative text-center flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background border-4 border-primary text-2xl font-bold text-primary font-heading shadow-xl mb-6">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.name}</h3>
                <p className="text-muted-foreground px-4 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
