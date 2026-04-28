import React from 'react';

const testimonials = [
  {
    body: "JobLinker made my job search incredibly smooth. The UI is clean, and I found my dream role at a tech startup within two weeks of signing up.",
    author: {
      name: "Sarah Jenkins",
      role: "Frontend Developer",
      imageUrl: "https://i.pravatar.cc/150?u=sarah"
    }
  },
  {
    body: "As a recruiter, finding the right talent was always a headache. The modern dashboard and ATS features here saved me countless hours.",
    author: {
      name: "Michael Chen",
      role: "HR Manager @ TechCorp",
      imageUrl: "https://i.pravatar.cc/150?u=michael"
    }
  },
  {
    body: "The direct messaging feature and real-time application tracking gave me the transparency I always wanted during my job hunt.",
    author: {
      name: "Elena Rodriguez",
      role: "Product Designer",
      imageUrl: "https://i.pravatar.cc/150?u=elena"
    }
  }
];

const TestimonialsSection = () => {
  return (
    <div className="bg-muted/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            Loved by candidates and recruiters alike
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between bg-card border border-border p-8 shadow-sm rounded-2xl">
                <blockquote className="text-muted-foreground leading-relaxed">
                  "{testimonial.body}"
                </blockquote>
                <div className="mt-6 flex items-center gap-x-4">
                  <img className="h-12 w-12 rounded-full bg-muted object-cover" src={testimonial.author.imageUrl} alt="" />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
