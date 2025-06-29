import { NextResponse } from 'next/server';

// Sample course data (we'll make this dynamic later)
const courses = [
  {
    id: 1,
    title: "Next.js Fundamentals",
    description: "Learning Next.js for job interview",
    hours: 30,
    completed: 8,
    status: "in-progress"
  },
  {
    id: 2,
    title: "TypeScript Basics",
    description: "Mastering TypeScript fundamentals",
    hours: 20,
    completed: 20,
    status: "completed"
  }
];

// GET /api/courses
export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: courses 
  });
}

// POST /api/courses  
export async function POST(request: Request) {
  const body = await request.json();
  
  const newCourse = {
    id: courses.length + 1,
    ...body,     // shallow copy for new object
    completed: 0,
    status: "not-started"
  };
  
  courses.push(newCourse);
  
  return NextResponse.json({ 
    success: true, 
    data: newCourse 
  });
}