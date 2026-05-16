import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/store/jobSlice';
import { useContext } from 'react';
import { AuthContext } from '@/Context-Api/AuthContext';
import { toast } from 'sonner';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useContext(AuthContext);
  const savedJobs = useSelector(store => store.job.savedJobs) || [];
  const isSaved = savedJobs.some(j => j._id === job._id);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    return days === 0 ? "Today" : `${days}d ago`;
  }

  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
      initial="hidden"
      animate="visible"
      variants={boxVariants}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-border shadow-sm">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
            <AvatarFallback className="bg-primary/5 text-primary font-medium">{job?.company?.name?.charAt(0) || 'C'}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">{job?.company?.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{job?.location}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full hover:bg-primary/10 hover:text-primary transition-colors ${isSaved ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!userData?._id) {
              toast.error("Please login to save jobs");
              return;
            }
            dispatch(toggleSavedJob({ job, userId: userData._id }));
          }}
        >
          {isSaved ? <BookmarkCheck className="h-5 w-5 fill-primary/20" /> : <Bookmark className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mb-4 flex-1">
        <h1 className='font-bold text-xl text-foreground mb-2 line-clamp-1 group-hover:text-primary/90 transition-colors'>{job?.title}</h1>
        <p className='text-sm text-muted-foreground line-clamp-2 leading-relaxed'>{job?.description}</p>
      </div>

      <div className='flex flex-wrap items-center gap-2 mb-6'>
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-medium px-2.5 py-0.5">
          {job?.position} Positions
        </Badge>
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 font-medium px-2.5 py-0.5">
          {job?.jobType}
        </Badge>
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 font-medium px-2.5 py-0.5">
          {job?.salary}
        </Badge>
      </div>

      <div className='flex items-center gap-3 mt-auto pt-4 border-t border-border/50'>
        <span className="text-xs font-medium text-muted-foreground mr-auto">{daysAgoFunction(job?.createdAt)}</span>
        <Button 
          variant="outline" 
          className="rounded-full px-5 text-sm font-medium hover:bg-accent"
          onClick={() => {
            window.scrollTo(0, 0); 
            navigate(`/jobs/Detail/${job._id}`);
          }}
        >
          Details
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;