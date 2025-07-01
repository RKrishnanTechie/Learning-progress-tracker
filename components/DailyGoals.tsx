// components/DailyGoals.tsx
'use client';

import { useState, useEffect } from 'react';
import { AddJobModal } from './AddJobModal';

export function DailyGoals() {
  const [hoursStudied, setHoursStudied] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobsAppliedToday, setJobsAppliedToday] = useState(0);

  const targetHours = 2;
  const targetJobs = 5;

  const getMotivationalMessage = (hours: number) => {
    if (hours < 2) return "You showed up - appreciate that! 👏";
    if (hours === 2) return "Good! Keep it up! 🎯";
    if (hours > 2) return "Wow! Great going - you deserve a treat! 🎉";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // TODO: Save to API later
  };

  const handleJobAdded = () => {
    setJobsAppliedToday(prev => prev + 1);
  };

  // Fetch today's job applications
  useEffect(() => {
    const fetchTodaysJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const result = await response.json();
        
        if (result.success) {
          const today = new Date().toISOString().split('T')[0];
          const todaysJobs = result.data.filter((job: any) => job.dateApplied === today);
          setJobsAppliedToday(todaysJobs.length);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchTodaysJobs();
  }, []);

  const jobProgress = (jobsAppliedToday / targetJobs) * 100;
  const jobsRemaining = Math.max(0, targetJobs - jobsAppliedToday);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Today's Goals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Goal */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">📚 Learning Goal</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-600">{targetHours} hours</div>
              <div className="text-gray-500">Target for today</div>
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours studied today:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="12"
                    value={hoursStudied}
                    onChange={(e) => setHoursStudied(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="0"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Log Hours
                </button>
              </form>
            ) : (
                <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-4">
                  {hoursStudied} hours completed!
                </div>
                
                
                <div className={`p-4 rounded-xl mb-4 ${
                  hoursStudied < 2 ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200' :
                  hoursStudied === 2 ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200' :
                  'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200'
                }`}>
                  <div className={`text-2xl mb-2 ${
                    hoursStudied < 2 ? 'text-orange-600' :
                    hoursStudied === 2 ? 'text-green-600' :
                    'text-purple-600'
                  }`}>
                    {hoursStudied < 2 ? '👏 ' : hoursStudied === 2 ? '🎯 ' : '🎉 '}
                  </div>
                  
                  <div className={`text-lg font-semibold mb-1 ${
                    hoursStudied < 2 ? 'text-orange-800' :
                    hoursStudied === 2 ? 'text-green-800' :
                    'text-purple-800'
                  }`}>
                    {getMotivationalMessage(hoursStudied)}
                  </div>
                  
                  <div className={`text-sm ${
                    hoursStudied < 2 ? 'text-orange-700' :
                    hoursStudied === 2 ? 'text-green-700' :
                    'text-purple-700'
                  }`}>
                    {hoursStudied < 2 ? 'Every step counts towards your goal!' :
                     hoursStudied === 2 ? 'Perfect! You hit your daily target!' :
                     'Outstanding dedication to your learning journey!'}
                  </div>
                </div>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Update hours
                </button>
              </div>
            )}
          </div>

          {/* Job Application Goal */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">💼 Job Applications</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-600">{targetJobs} jobs</div>
              <div className="text-gray-500">Target for today</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700 mb-2">
                Applied: {jobsAppliedToday} / {targetJobs}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, jobProgress)}%` }}
                ></div>
              </div>
              
              {jobsRemaining > 0 ? (
                <div>
                  <div className="text-sm text-gray-600 mb-3">
                    {jobsRemaining} applications remaining
                  </div>
                  <button 
                    onClick={() => setIsJobModalOpen(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Job Application
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-green-600 font-medium mb-2">🎉 Daily goal achieved!</div>
                  <button 
                    onClick={() => setIsJobModalOpen(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Another Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Modal */}
      <AddJobModal 
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onJobAdded={handleJobAdded}
      />
    </>
  );
}