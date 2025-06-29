// This is a Server Component (no 'use client')

async function getLearningData() {
    // Simulate fetching data (in real app, this would be database/API call)
    // This runs on the SERVER only
    return {
      totalHours: 25,
      coursesCompleted: 3,
      currentStreak: 7
    };
  }
  
  export async function LearningStats() {
    // This await works because it's a Server Component
    const stats = await getLearningData();
  
    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-blue-800">{stats.totalHours}</h3>
          <p className="text-blue-600">Total Hours</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-green-800">{stats.coursesCompleted}</h3>
          <p className="text-green-600">Courses Completed</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-purple-800">{stats.currentStreak}</h3>
          <p className="text-purple-600">Day Streak</p>
        </div>
      </div>
    );
  }