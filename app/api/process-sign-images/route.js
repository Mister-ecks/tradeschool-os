import { NextResponse } from 'next/server'
import { writeFile, mkdir, readdir } from 'fs/promises'
import { join } from 'path'

// Sign identification patterns (same as in the script)
const SIGN_PATTERNS = {
  'stop-sign': {
    keywords: ['stop', 'octagon', 'red', 'white text'],
    patterns: [/stop/i, /octagon/i, /red.*white/i],
    category: 'regulatory'
  },
  'yield-sign': {
    keywords: ['yield', 'triangle', 'red border', 'white background'],
    patterns: [/yield/i, /triangle/i, /red.*border/i],
    category: 'regulatory'
  },
  'speed-limit': {
    keywords: ['speed', 'limit', 'km/h', 'mph', 'number'],
    patterns: [/speed/i, /limit/i, /\d+.*km\/h/i, /\d+.*mph/i],
    category: 'regulatory'
  },
  'no-entry': {
    keywords: ['no entry', 'do not enter', 'red circle', 'white background'],
    patterns: [/no.*entry/i, /do.*not.*enter/i, /red.*circle/i],
    category: 'regulatory'
  },
  'one-way': {
    keywords: ['one way', 'arrow', 'blue', 'white arrow'],
    patterns: [/one.*way/i, /arrow/i, /blue.*arrow/i],
    category: 'regulatory'
  },
  'no-parking': {
    keywords: ['no parking', 'parking', 'red circle', 'p symbol'],
    patterns: [/no.*parking/i, /parking/i, /p.*symbol/i],
    category: 'regulatory'
  },
  'no-stopping': {
    keywords: ['no stopping', 'stopping', 'red circle', 'stop symbol'],
    patterns: [/no.*stopping/i, /stopping/i, /stop.*symbol/i],
    category: 'regulatory'
  },
  'no-left-turn': {
    keywords: ['no left turn', 'left turn', 'arrow', 'red circle'],
    patterns: [/no.*left.*turn/i, /left.*turn/i, /left.*arrow/i],
    category: 'regulatory'
  },
  'no-right-turn': {
    keywords: ['no right turn', 'right turn', 'arrow', 'red circle'],
    patterns: [/no.*right.*turn/i, /right.*turn/i, /right.*arrow/i],
    category: 'regulatory'
  },
  'do-not-pass': {
    keywords: ['do not pass', 'passing', 'cars', 'vehicles'],
    patterns: [/do.*not.*pass/i, /passing/i, /cars/i, /vehicles/i],
    category: 'regulatory'
  },
  'curve-ahead': {
    keywords: ['curve', 'bend', 'yellow', 'diamond'],
    patterns: [/curve/i, /bend/i, /yellow.*diamond/i],
    category: 'warning'
  },
  'winding-road': {
    keywords: ['winding', 'curves', 'squiggly', 'yellow'],
    patterns: [/winding/i, /curves/i, /squiggly/i, /wavy/i],
    category: 'warning'
  },
  'steep-hill': {
    keywords: ['steep', 'hill', 'grade', 'truck', 'yellow'],
    patterns: [/steep/i, /hill/i, /grade/i, /truck/i],
    category: 'warning'
  },
  'slippery-when-wet': {
    keywords: ['slippery', 'wet', 'car', 'skid', 'yellow'],
    patterns: [/slippery/i, /wet/i, /skid/i, /car.*water/i],
    category: 'warning'
  },
  'road-narrows': {
    keywords: ['narrows', 'narrow', 'width', 'yellow'],
    patterns: [/narrows/i, /narrow/i, /width/i],
    category: 'warning'
  },
  'deer-crossing': {
    keywords: ['deer', 'animal', 'crossing', 'yellow'],
    patterns: [/deer/i, /animal/i, /crossing/i],
    category: 'warning'
  },
  'pedestrian-crossing': {
    keywords: ['pedestrian', 'walking', 'person', 'crossing'],
    patterns: [/pedestrian/i, /walking/i, /person/i, /crossing/i],
    category: 'warning'
  },
  'school-zone-ahead': {
    keywords: ['school', 'children', 'kids', 'zone'],
    patterns: [/school/i, /children/i, /kids/i, /zone/i],
    category: 'warning'
  },
  'railway-crossing': {
    keywords: ['railway', 'train', 'crossing', 'x shape'],
    patterns: [/railway/i, /train/i, /crossing/i, /x.*shape/i],
    category: 'warning'
  },
  'low-clearance': {
    keywords: ['low clearance', 'height', 'bridge', 'truck'],
    patterns: [/low.*clearance/i, /height/i, /bridge/i, /truck/i],
    category: 'warning'
  },
  'hospital': {
    keywords: ['hospital', 'medical', 'h symbol', 'blue'],
    patterns: [/hospital/i, /medical/i, /h.*symbol/i, /blue.*h/i],
    category: 'guide'
  },
  'gas-station': {
    keywords: ['gas', 'fuel', 'station', 'pump', 'blue'],
    patterns: [/gas/i, /fuel/i, /station/i, /pump/i],
    category: 'guide'
  },
  'rest-area': {
    keywords: ['rest', 'area', 'picnic', 'blue'],
    patterns: [/rest.*area/i, /picnic/i, /rest/i],
    category: 'guide'
  },
  'exit-sign': {
    keywords: ['exit', 'green', 'highway'],
    patterns: [/exit/i, /green.*exit/i],
    category: 'guide'
  },
  'service-centre': {
    keywords: ['service', 'centre', 'center', 'services'],
    patterns: [/service/i, /centre/i, /center/i, /services/i],
    category: 'guide'
  }
}

function identifySign(filename) {
  const name = filename.toLowerCase().replace(/[^a-z0-9]/g, ' ')
  
  // Try to match by filename
  for (const [signId, config] of Object.entries(SIGN_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(name) || pattern.test(filename)) {
        return { signId, category: config.category, confidence: 'high' }
      }
    }
  }
  
  return { signId: 'unknown', category: 'unknown', confidence: 'low' }
}

export async function POST(request) {
  try {
    const data = await request.formData()
    const files = data.getAll('images')
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const results = []
    const signsDir = join(process.cwd(), 'public', 'signs')

    // Ensure signs directory exists
    try {
      await mkdir(signsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    for (const file of files) {
      if (!file || typeof file === 'string') continue

      // Validate file type
      if (!file.type.startsWith('image/')) {
        results.push({
          type: 'error',
          message: `${file.name} - Not an image file`,
          details: 'Please upload only image files (PNG, JPG, GIF, etc.)'
        })
        continue
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        results.push({
          type: 'error',
          message: `${file.name} - File too large`,
          details: 'File size must be less than 10MB'
        })
        continue
      }

      try {
        // Identify the sign
        const identification = identifySign(file.name)
        
        if (identification.signId === 'unknown') {
          results.push({
            type: 'warning',
            message: `${file.name} - Unknown sign type`,
            details: 'Could not identify sign type. Please rename file to include sign type (e.g., "stop-sign.jpg")'
          })
          continue
        }

        // Create filename
        const fileExtension = file.name.split('.').pop()
        const fileName = `${identification.signId}.${fileExtension}`
        
        // Create category directory
        const categoryDir = join(signsDir, identification.category)
        try {
          await mkdir(categoryDir, { recursive: true })
        } catch (error) {
          // Directory might already exist
        }

        // Save file
        const filePath = join(categoryDir, fileName)
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        await writeFile(filePath, buffer)

        // Return success
        results.push({
          type: 'success',
          message: `${file.name} → ${identification.category}/${fileName}`,
          details: `Successfully processed and organized as ${identification.signId}`
        })

      } catch (error) {
        console.error('Error processing file:', file.name, error)
        results.push({
          type: 'error',
          message: `${file.name} - Processing failed`,
          details: error.message
        })
      }
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Upload processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process images' }, 
      { status: 500 }
    )
  }
}


