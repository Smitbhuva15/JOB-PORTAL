import React from 'react';
import { Search, FileText, Briefcase, Zap, Building, Users } from 'lucide-react';

const features = [
  {
    name: 'Smart Job Search',
    description: 'Find the perfect match with our AI-powered semantic search that understands context and skills, not just keywords.',
    icon: Search,
  },
  {
    name: 'Easy Application',
    description: 'Apply to multiple companies with a single click. Save your profile and let employers come to you.',
    icon: Zap,
  },
  {
    name: 'Top Companies',
    description: 'Access exclusive roles from leading tech companies, startups, and Fortune 500 enterprises.',
    icon: Building,
  },
  // {
  //   name: 'Resume Builder',
  //   description: 'Create professional resumes in minutes with our built-in ATS-friendly templates and suggestions.',
  //   icon: FileText,
  // },
  // {
  //   name: 'Career Tracking',
  //   description: 'Monitor your application status, interview schedules, and offers all from one intuitive dashboard.',
  //   icon: Briefcase,
  // },
  // {
  //   name: 'Direct Messaging',
  //   description: 'Communicate directly with recruiters and hiring managers without leaving the platform.',
  //   icon: Users,
  // },
];

const FeaturesSection = () => {
  return (
    <div className="bg-muted/30 py-24 sm:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Hire Faster, Work Better</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            Everything you need to succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Whether you are looking for your next big opportunity or searching for top talent, our platform provides the modern tools necessary to streamline the process.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
