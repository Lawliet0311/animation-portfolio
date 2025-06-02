import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { fileName, folder } = await request.json();

    if (!fileName) {
      return NextResponse.json({ message: 'File name is required.' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', folder || 'uploads');
    const filePath = path.join(uploadDir, fileName);

    await unlink(filePath);

    return NextResponse.json({ message: `File ${fileName} deleted successfully.` });
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ message: 'File deletion failed', error: error.message }, { status: 500 });
  }
}