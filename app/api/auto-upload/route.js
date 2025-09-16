import { NextResponse } from 'next/server'
import { writeFile, mkdir, readdir } from 'fs/promises'
import { join } from 'path'

// Sign identification patterns
const SIGN_PATTERNS = {
  'stop-sign': {
    patterns: [/stop/i, /octagon/i, /red.*white/i],
    category: 'regulatory'
  },
  'yield-sign': {
    patterns: [/yield/i, /triangle/i, /red.*border/i],
    category: 'regulatory'
  },
  'speed-limit': {
    patterns: [/speed/i, /limit/i, /\d+.*km\/h/i, /\d+.*mph/i],
    category: 'regulatory'
  },
  'no-entry': {
    patterns: [/no.*entry/i, /do.*not.*enter/i, /red.*circle/i],
    category: 'regulatory'
  },
  'one-way': {
    patterns: [/one.*way/i, /arrow/i, /blue.*arrow/i],
    category: 'regulatory'
  },
  'no-parking': {
    patterns: [/no.*parking/i, /parking/i, /p.*symbol/i],
    category: 'regulatory'
  },
  'no-stopping': {
    patterns: [/no.*stopping/i, /stopping/i, /stop.*symbol/i],
    category: 'regulatory'
  },
  'no-left-turn': {
    patterns: [/no.*left.*turn/i, /left.*turn/i, /left.*arrow/i],
    category: 'regulatory'
  },
  'no-right-turn': {
    patterns: [/no.*right.*turn/i, /right.*turn/i, /right.*arrow/i],
    category: 'regulatory'
  },
  'do-not-pass': {
    patterns: [/do.*not.*pass/i, /passing/i, /cars/i, /vehicles/i],
    category: 'regulatory'
  },
  'curve-ahead': {
    patterns: [/curve/i, /bend/i, /yellow.*diamond/i],
    category: 'warning'
  },
  'winding-road': {
    patterns: [/winding/i, /curves/i, /squiggly/i, /wavy/i],
    category: 'warning'
  },
  'steep-hill': {
    patterns: [/steep/i, /hill/i, /grade/i, /truck/i],
    category: 'warning'
  },
  'slippery-when-wet': {
    patterns: [/slippery/i, /wet/i, /skid/i, /car.*water/i],
    category: 'warning'
  },
  'road-narrows': {
    patterns: [/narrows/i, /narrow/i, /width/i],
    category: 'warning'
  },
  'deer-crossing': {
    patterns: [/deer/i, /animal/i, /crossing/i],
    category: 'warning'
  },
  'pedestrian-crossing': {
    patterns: [/pedestrian/i, /walking/i, /person/i, /crossing/i],
    category: 'warning'
  },
  'school-zone-ahead': {
    patterns: [/school/i, /children/i, /kids/i, /zone/i],
    category: 'warning'
  },
  'railway-crossing': {
    patterns: [/railway/i, /train/i, /crossing/i, /x.*shape/i],
    category: 'warning'
  },
  'low-clearance': {
    patterns: [/low.*clearance/i, /height/i, /bridge/i, /truck/i],
    category: 'warning'
  },
  'hospital': {
    patterns: [/hospital/i, /medical/i, /h.*symbol/i, /blue.*h/i],
    category: 'guide'
  },
  'gas-station': {
    patterns: [/gas/i, /fuel/i, /station/i, /pump/i],
    category: 'guide'
  },
  'rest-area': {
    patterns: [/rest.*area/i, /picnic/i, /rest/i],
    category: 'guide'
  },
  'exit-sign': {
    patterns: [/exit/i, /green.*exit/i],
    category: 'guide'
  },
  'service-centre': {
    patterns: [/service/i, /centre/i, /center/i, /services/i],
    category: 'guide'
  }
}

function identifySign(filename) {
  const name = filename.toLowerCase().replace(/[^a-z0-9]/g, ' ')
  
  for (const [signId, config] of Object.entries(SIGN_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(name) || pattern.test(filename)) {
        return { signId, category: config.category }
      }
    }
  }
  
  return { signId: 'unknown', category: 'unknown' }
}

export async function POST(request) {
  try {
    const data = await request.formData()
    const files = data.getAll('images')
    
    if (!files || files.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No images provided' 
      }, { status: 400 })
    }

    const results = []
    const signsDir = join(process.cwd(), 'public', 'signs')

    // Ensure signs directory exists
    await mkdir(signsDir, { recursive: true })

    for (const file of files) {
      if (!file || typeof file === 'string') continue

      // Validate file type
      if (!file.type.startsWith('image/')) {
        results.push({
          success: false,
          filename: file.name,
          message: 'Not an image file'
        })
        continue
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        results.push({
          success: false,
          filename: file.name,
          message: 'File too large (max 10MB)'
        })
        continue
      }

      try {
        // Identify the sign
        const identification = identifySign(file.name)
        
        if (identification.signId === 'unknown') {
          results.push({
            success: false,
            filename: file.name,
            message: 'Could not identify sign type. Please rename file to include sign type.'
          })
          continue
        }

        // Create filename
        const fileExtension = file.name.split('.').pop()
        const fileName = `${identification.signId}.${fileExtension}`
        
        // Create category directory
        const categoryDir = join(signsDir, identification.category)
        await mkdir(categoryDir, { recursive: true })

        // Save file
        const filePath = join(categoryDir, fileName)
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        await writeFile(filePath, buffer)

        results.push({
          success: true,
          filename: file.name,
          newName: fileName,
          category: identification.category,
          message: `Successfully processed as ${identification.signId}`
        })

      } catch (error) {
        console.error('Error processing file:', file.name, error)
        results.push({
          success: false,
          filename: file.name,
          message: `Processing failed: ${error.message}`
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const totalCount = results.length

    return NextResponse.json({
      success: true,
      message: `Processed ${successCount}/${totalCount} images successfully`,
      results: results
    })

  } catch (error) {
    console.error('Auto-upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process images',
        error: error.message 
      }, 
      { status: 500 }
    )
  }
}


