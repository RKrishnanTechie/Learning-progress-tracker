export interface Course {
    id: number;
    title: string;
    description: string;
    hours: number;
    completed: number;
    status: 'not-started' | 'in-progress' | 'completed';
  }

  export interface JobApplication {
    id: number;
    company: string;
    position: string;
    dateApplied: string;
    followUpDate?: string;
    followedUp: boolean;
    status: 'applied' | 'interview' | 'rejected' | 'offer';
    notes?: string;
  }
  
  export interface DailyProgress {
    date: string;
    hoursStudied: number;
    jobsApplied: number;
    targetHours: number;
    targetJobs: number;
  }