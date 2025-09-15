import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get('image')
    const signId = data.get('signId')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!signId) {
      return NextResponse.json({ error: 'No sign ID provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Create filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${signId}.${fileExtension}`
    
    // Ensure signs directory exists
    const signsDir = join(process.cwd(), 'public', 'signs')
    try {
      await mkdir(signsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save file
    const filePath = join(signsDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filePath, buffer)

    // Return the public URL
    const imageUrl = `/signs/${fileName}`

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      fileName,
      signId 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' }, 
      { status: 500 }
    )
  }
}

