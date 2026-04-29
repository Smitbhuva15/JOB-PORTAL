import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Job from './jobs/Job';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const savedJobs = useSelector(store => store.job.savedJobs) || [];
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate slight loading state for smooth UI transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-background min-h-[calc(100vh-8rem)] py-8'>
      <div className='sm:max-w-screen-sm md:max-w-2xl xl:max-w-7xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className="mb-8">
          <h1 className="font-bold text-3xl font-heading text-foreground">
            Saved Jobs
          </h1>
          <p className="text-muted-foreground mt-2">
            {!isLoading && `You have saved ${savedJobs.length} jobs`}
          </p>
        </div>

        {
          isLoading ? (
            <div className="flex justify-center items-center w-full min-h-[50vh]">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            savedJobs.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-full min-h-[40vh] bg-card border border-border rounded-2xl shadow-sm">
                <div className='text-muted-foreground text-center text-lg font-medium'>
                  You haven't saved any jobs yet.
                </div>
                <button 
                  onClick={() => navigate('/jobs')}
                  className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
                {savedJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default SavedJobs;
