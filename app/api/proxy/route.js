// /app/api/proxy/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { url, method, headers } = request;
  const backendURL =
    'https://changeeducationnepal.000.pe/api' + url.replace('/api/proxy', '');

  // Forward the request to the Laravel backend
  try {
    const response = await fetch(backendURL, {
      method,
      headers: {
        ...Object.fromEntries(headers),
        Origin: 'https://lms-wheat-seven.vercel.app', // Explicitly set origin
      },
      body: method !== 'GET' ? await request.text() : undefined,
    });

    const data = await response.json();

    // Return the response with appropriate headers
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
