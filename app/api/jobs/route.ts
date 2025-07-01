import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { JobApplication } from '@/types';

const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

async function readJobs(): Promise<JobApplication[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading jobs file:', error);
    return [];
  }
}

async function writeJobs(jobs: JobApplication[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error('Error writing jobs file:', error);
    throw error;
  }
}

// GET /api/jobs
export async function GET() {
  try {
    const jobs = await readJobs();
    return NextResponse.json({ 
      success: true, 
      data: jobs 
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Failed to read jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobs = await readJobs();
    
    const newId = jobs.length > 0 ? Math.max(...jobs.map((j: JobApplication) => j.id)) + 1 : 1;
    
    const newJob: JobApplication = {
      id: newId,
      company: body.company,
      position: body.position,
      dateApplied: new Date().toISOString().split('T')[0], // Today's date
      followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      followedUp: false,
      status: 'applied',
      notes: body.notes || ''
    };
    
    jobs.push(newJob);
    await writeJobs(jobs);
    
    return NextResponse.json({ 
      success: true, 
      data: newJob 
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create job application' },
      { status: 500 }
    );
  }
}