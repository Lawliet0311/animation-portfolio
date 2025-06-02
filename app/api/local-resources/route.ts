import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'uploads';
    const maxResults = parseInt(searchParams.get('max_results') || '50', 10);

    const uploadDir = path.join(process.cwd(), 'public', folder);

    let files = [];
    try {
      files = await readdir(uploadDir);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return NextResponse.json({ resources: [] });
      }
      throw error;
    }

    const resources = await Promise.all(
      files.slice(0, maxResults).map(async (fileName) => {
        const filePath = path.join(uploadDir, fileName);
        const fileStat = await stat(filePath);
        return {
          fileName,
          url: `/${folder}/${fileName}`,
          size: fileStat.size,
          lastModified: fileStat.mtime.toISOString(),
        };
      })
    );

    return NextResponse.json({ resources });
  } catch (error: any) {
    console.error('Error fetching local resources:', error);
    return NextResponse.json({ message: 'Failed to fetch local resources', error: error.message }, { status: 500 });
  }
}