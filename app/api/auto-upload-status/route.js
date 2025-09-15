import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const signsDir = join(process.cwd(), 'public', 'signs')
    const categories = ['regulatory', 'warning', 'guide', 'school', 'temporary']
    
    let allImages = []
    
    // Check each category for images
    for (const category of categories) {
      const categoryDir = join(signsDir, category)
      try {
        const files = await readdir(categoryDir)
        const imageFiles = files.filter(file => 
          /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
        )
        
        for (const file of imageFiles) {
          const filePath = join(categoryDir, file)
          const stats = await stat(filePath)
          
          allImages.push({
            name: file,
            category: category,
            newName: file,
            size: stats.size,
            modified: stats.mtime
          })
        }
      } catch (error) {
        // Category directory doesn't exist, skip
      }
    }
    
    // Sort by modification time (newest first)
    allImages.sort((a, b) => new Date(b.modified) - new Date(a.modified))
    
    // Take only the 10 most recent
    const recentImages = allImages.slice(0, 10)
    
    return NextResponse.json({
      status: 'active',
      message: 'Auto-upload system is running',
      images: recentImages,
      totalImages: allImages.length
    })
    
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Failed to check system status',
      error: error.message
    }, { status: 500 })
  }
}

