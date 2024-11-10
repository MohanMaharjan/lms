import { NextResponse } from 'next/server';

export async function POST(request) {
  // Use URL API to parse and replace only the necessary part
  const urlPath = new URL(request.url).pathname.replace('/api/proxy', '');
  const backendURL = `https://changeeducationnepal.000.pe/api${urlPath}`;

  try {
    const response = await fetch(backendURL, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        Origin: 'https://lms-wheat-seven.vercel.app', // Set origin explicitly
      },
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    const data = await response.json();

    // Return the response with appropriate headers for CORS
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': 'https://lms-wheat-seven.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Proxy request failed' },
      { status: 500 }
    );
  }
}
