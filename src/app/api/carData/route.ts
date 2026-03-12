import { NextResponse } from "next/server";

// In a Next.js Server Component or API Route
import { promises as fs } from 'fs';
import path from 'path';

async function loadDataToJson() {
  // 1. Point to the file in your root 'data' folder
  const filePath = path.join( 'data', 'cars.json');
  
  // 2. Read the file
  const fileContents = await fs.readFile(filePath, 'utf8');
  
  // 3. Parse the JSON string into a JavaScript object
  const data = JSON.parse(fileContents);

  // Now you can use 'data' directly in your component
  return data;
}

export async function GET() {
  const data = await loadDataToJson()
  return Response.json(data);
}