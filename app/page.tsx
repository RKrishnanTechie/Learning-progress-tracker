// app/page.tsx
import { LearningStats } from '@/components/LearningStats';
import { DailyGoals } from '@/components/DailyGoals';
import { AddCourseForm } from '@/components/AddCourseForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Learning & Career Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Your daily companion for learning goals and job applications
          </p>
        </div>
        
        {/* Daily Goals Section */}
        <div className="mb-8">
          <DailyGoals />
        </div>
        
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
          <LearningStats />
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Course</h2>
            <AddCourseForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">More features coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}