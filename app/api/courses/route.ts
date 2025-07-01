import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Course } from '@/types';

const dataFilePath = path.join(process.cwd(), 'data', 'courses.json');

// Helper function to read courses from file
async function readCourses() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading courses file:', error);
    return [];
  }
}

// Helper function to write courses to file
async function writeCourses(courses: Course[]) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(courses, null, 2));
  } catch (error) {
    console.error('Error writing courses file:', error);
    throw error;
  }
}

// GET /api/courses
export async function GET() {
  try {
    const courses = await readCourses();
    return NextResponse.json({ 
      success: true, 
      data: courses 
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Failed to read courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses  
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const courses = await readCourses();
    
    // Generate new ID
    const newId = courses.length > 0 ? Math.max(...courses.map((c: Course) => c.id)) + 1 : 1;
    
    const newCourse = {
      id: newId,
      ...body,
      completed: 0,
      status: "not-started"
    };
    
    courses.push(newCourse);
    await writeCourses(courses);
    
    return NextResponse.json({ 
      success: true, 
      data: newCourse 
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create course' },
      { status: 500 }
    );
  }
}