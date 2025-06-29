import { AddCourseButton } from "./components/AddCourseButton";
import { LearningStats } from "./components/LearningStats";
import { StreakCounter } from "./components/StreakCounter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learning Progress Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your learning journey and career progress
        </p>

        {/* Server Component with async data */}
        <LearningStats />

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome to Your Learning Dashboard
          </h2>
          <p className="text-gray-600">
            This is a Next.js Server Component - it runs on the server!
          </p>
          <AddCourseButton/>
          
         <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Daily Progress
            </h2>
            {/* Client Component with interaction */}
            <StreakCounter />
          </div>
        </div>
      </div>
    </div>
  );
}