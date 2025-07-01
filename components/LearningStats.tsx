
import { Course } from '@/types';

async function getCombinedStats() {
  try {
    // Fetch both courses and jobs
    const [coursesResponse, jobsResponse] = await Promise.all([
      fetch('http://localhost:3000/api/courses'),
      fetch('http://localhost:3000/api/jobs')
    ]);
    
    const coursesResult = await coursesResponse.json();
    const jobsResult = await jobsResponse.json();
    
    if (coursesResult.success && jobsResult.success) {
      const courses: Course[] = coursesResult.data;
      const jobs = jobsResult.data;
      
      // Simple, clear metrics
      const totalCourses = courses.length;
      const completedCourses = courses.filter((course: Course) => course.status === 'completed').length;
      
      const totalApplications = jobs.length;
      const thisWeekApplications = jobs.filter((job: { dateApplied: string }) => {
        const jobDate = new Date(job.dateApplied);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return jobDate >= weekAgo;
      }).length;
      
      return {
        totalCourses,
        completedCourses,
        totalApplications,
        thisWeekApplications
      };
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
  
  return { 
    totalCourses: 0,
    completedCourses: 0,
    totalApplications: 0,
    thisWeekApplications: 0
  };
}

export async function LearningStats() {
  const stats = await getCombinedStats();
  
  if (!stats) {
    return <div>Error loading stats</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-blue-800">{stats.totalCourses}</h3>
        <p className="text-blue-600">Active Courses</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-green-800">{stats.completedCourses}</h3>
        <p className="text-green-600">Courses Completed</p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-purple-800">{stats.totalApplications}</h3>
        <p className="text-purple-600">Total Applications</p>
      </div>
      <div className="bg-orange-100 p-4 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-orange-800">{stats.thisWeekApplications}</h3>
        <p className="text-orange-600">This Week</p>
      </div>
    </div>
  );
}