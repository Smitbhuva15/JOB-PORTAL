import { Button } from '../../components/ui/button'
import React, { useState } from 'react'
import { Search, Briefcase, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setsearchjob } from '../../store/jobSlice';

const HeroSection = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handelsearch = () => {
    if(!input.trim()) return;
    navigate('/browse');
    dispatch(setsearchjob(input));
  }

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="mx-auto max-w-3xl text-center animate-in slide-in-from-bottom-8 duration-700">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/50 transition-colors flex items-center gap-2 bg-muted/30 backdrop-blur-sm">
              <span className="font-semibold text-primary">New Feature</span>
              <span className="h-4 w-px bg-border"></span>
              Modern applicant tracking system 
              <a href="/login" className="font-semibold text-primary flex items-center gap-1 hover:underline">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold font-heading tracking-tight sm:text-6xl md:text-7xl">
            Search and apply smarter for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">dream career</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Access thousands of career opportunities across top industries. Apply quickly, track your applications, and grow with the right organization.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full sm:w-auto shadow-xl shadow-primary/5 rounded-full ring-1 ring-border bg-background/80 backdrop-blur-md focus-within:ring-primary/50 transition-all p-1 flex items-center">
              <div className="pl-4 pr-2 text-muted-foreground">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Find your dream job..."
                className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground py-3 px-2 text-base focus:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handelsearch()}
              />
              <Button 
                onClick={handelsearch}
                size="lg"
                className="rounded-full px-8 text-base shadow-lg hover:shadow-primary/25 transition-all"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Stats below search */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 pt-8 border-t border-border/50">
            <div>
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">Active Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">Companies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">1M+</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">Candidates</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">100%</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">Free to Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection