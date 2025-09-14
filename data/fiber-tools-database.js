export const fiberToolsDatabase = [
  {
    id: 'fusion-splicer-60s',
    name: 'Fujikura FSM-60S Fusion Splicer',
    category: 'splicing',
    barcode: 'FJ-FSM60S-001',
    qrCode: 'FJ-FSM60S-001',
    specifications: {
      spliceLoss: '<0.02dB',
      spliceTime: '9 seconds',
      batteryLife: '200 splices',
      weight: '2.8kg',
      dimensions: '200x150x100mm',
      operatingTemp: '-10°C to +50°C',
      wavelengths: '1310nm, 1550nm'
    },
    usage: 'Single-mode and multimode fiber fusion splicing with automatic alignment and arc optimization',
    maintenance: {
      cleaning: 'Daily - Clean electrodes and fiber holders',
      calibration: 'Monthly - Perform arc calibration',
      service: 'Annually - Full equipment service',
      lastService: '2024-01-15',
      nextService: '2025-01-15'
    },
    safety: [
      'Always wear laser safety glasses',
      'Ensure proper ventilation in work area',
      'Never look directly into fiber ends',
      'Keep equipment dry and clean'
    ],
    tutorials: [
      'Basic operation setup',
      'Fiber preparation techniques',
      'Splicing parameter optimization',
      'Troubleshooting common issues'
    ],
    status: 'available',
    location: 'Lab Station A',
    lastUsed: '2024-12-10'
  },
  {
    id: 'otdr-exfo-ftb-1',
    name: 'EXFO FTB-1 OTDR',
    category: 'testing',
    barcode: 'EX-FTB1-001',
    qrCode: 'EX-FTB1-001',
    specifications: {
      wavelengths: '1310nm, 1550nm, 1625nm',
      range: '250km',
      resolution: '0.8m',
      batteryLife: '8 hours',
      weight: '1.2kg',
      dimensions: '250x150x50mm',
      operatingTemp: '-10°C to +50°C'
    },
    usage: 'Fiber optic testing, fault location, and network characterization with high-resolution trace analysis',
    maintenance: {
      cleaning: 'Before each use - Clean connectors and ports',
      calibration: 'Quarterly - Perform reference calibration',
      service: 'Annually - Full equipment service',
      lastService: '2024-03-20',
      nextService: '2025-03-20'
    },
    safety: [
      'Never look into fiber end when testing',
      'Use proper connector adapters',
      'Ensure clean connections',
      'Follow laser safety protocols'
    ],
    tutorials: [
      'Basic OTDR operation',
      'Trace analysis techniques',
      'Fault location methods',
      'Report generation'
    ],
    status: 'available',
    location: 'Test Station B',
    lastUsed: '2024-12-08'
  },
  {
    id: 'fiber-stripper-ct-30',
    name: 'CT-30 Fiber Stripper',
    category: 'preparation',
    barcode: 'CT-30-001',
    qrCode: 'CT-30-001',
    specifications: {
      fiberTypes: '250μm, 900μm, 2.0mm, 3.0mm',
      bladeType: 'Precision tungsten carbide',
      weight: '0.3kg',
      dimensions: '150x50x25mm',
      material: 'Aluminum body'
    },
    usage: 'Precise stripping of fiber optic cable jackets and buffer tubes without damaging the fiber',
    maintenance: {
      cleaning: 'After each use - Clean blades and mechanism',
      calibration: 'Monthly - Check blade sharpness',
      service: 'As needed - Replace blades when dull',
      lastService: '2024-11-15',
      nextService: '2025-02-15'
    },
    safety: [
      'Keep fingers away from cutting blades',
      'Store in protective case when not in use',
      'Use appropriate pressure for different cable types',
      'Inspect blades before each use'
    ],
    tutorials: [
      'Proper stripping technique',
      'Cable type identification',
      'Blade maintenance',
      'Safety procedures'
    ],
    status: 'available',
    location: 'Preparation Station C',
    lastUsed: '2024-12-09'
  },
  {
    id: 'cleaver-fujikura-ct-100',
    name: 'Fujikura CT-100 Cleaver',
    category: 'preparation',
    barcode: 'FJ-CT100-001',
    qrCode: 'FJ-CT100-001',
    specifications: {
      cleaveAngle: '<0.5°',
      cleaveLength: '16mm',
      fiberTypes: '125μm, 250μm',
      weight: '0.8kg',
      dimensions: '200x100x80mm',
      bladeLife: '10,000 cleaves'
    },
    usage: 'Precise fiber end preparation for fusion splicing with consistent cleave quality',
    maintenance: {
      cleaning: 'Daily - Clean cleave area and blade',
      calibration: 'Weekly - Check cleave angle',
      service: 'As needed - Replace blade when dull',
      lastService: '2024-10-20',
      nextService: '2025-01-20'
    },
    safety: [
      'Handle with care to avoid blade contact',
      'Keep cleave area clean',
      'Use proper fiber positioning',
      'Store in protective case'
    ],
    tutorials: [
      'Fiber positioning technique',
      'Cleave angle optimization',
      'Blade replacement procedure',
      'Quality assessment'
    ],
    status: 'available',
    location: 'Preparation Station C',
    lastUsed: '2024-12-09'
  },
  {
    id: 'power-meter-exfo-fpm-600',
    name: 'EXFO FPM-600 Power Meter',
    category: 'testing',
    barcode: 'EX-FPM600-001',
    qrCode: 'EX-FPM600-001',
    specifications: {
      wavelengths: '850nm, 1300nm, 1310nm, 1550nm, 1625nm',
      range: '-70dBm to +10dBm',
      accuracy: '±0.02dB',
      resolution: '0.01dB',
      batteryLife: '200 hours',
      weight: '0.5kg'
    },
    usage: 'Optical power measurement for fiber optic systems with high accuracy and multiple wavelength support',
    maintenance: {
      cleaning: 'Before each use - Clean detector and connectors',
      calibration: 'Annually - Send for factory calibration',
      service: 'As needed - Replace detector if damaged',
      lastService: '2024-06-10',
      nextService: '2025-06-10'
    },
    safety: [
      'Never exceed maximum input power',
      'Use appropriate detector for wavelength',
      'Keep detector clean and protected',
      'Follow laser safety guidelines'
    ],
    tutorials: [
      'Power measurement setup',
      'Wavelength selection',
      'Calibration procedures',
      'Measurement accuracy'
    ],
    status: 'available',
    location: 'Test Station B',
    lastUsed: '2024-12-07'
  },
  {
    id: 'light-source-exfo-fls-600',
    name: 'EXFO FLS-600 Light Source',
    category: 'testing',
    barcode: 'EX-FLS600-001',
    qrCode: 'EX-FLS600-001',
    specifications: {
      wavelengths: '850nm, 1300nm, 1310nm, 1550nm, 1625nm',
      outputPower: '-3dBm to +7dBm',
      stability: '±0.05dB',
      modulation: '270Hz, 1kHz, 2kHz',
      batteryLife: '100 hours',
      weight: '0.6kg'
    },
    usage: 'Stable light source for fiber optic testing, loss measurement, and continuity testing',
    maintenance: {
      cleaning: 'Before each use - Clean output connector',
      calibration: 'Annually - Send for factory calibration',
      service: 'As needed - Replace if output unstable',
      lastService: '2024-06-10',
      nextService: '2025-06-10'
    },
    safety: [
      'Never look into output connector',
      'Use appropriate power level',
      'Keep output connector clean',
      'Follow laser safety protocols'
    ],
    tutorials: [
      'Light source setup',
      'Power level adjustment',
      'Modulation settings',
      'Testing procedures'
    ],
    status: 'available',
    location: 'Test Station B',
    lastUsed: '2024-12-07'
  },
  {
    id: 'microscope-fujikura-fs-60',
    name: 'Fujikura FS-60 Microscope',
    category: 'inspection',
    barcode: 'FJ-FS60-001',
    qrCode: 'FJ-FS60-001',
    specifications: {
      magnification: '200x, 400x',
      fieldOfView: '0.5mm, 0.25mm',
      lightSource: 'LED with intensity control',
      weight: '0.4kg',
      dimensions: '120x80x60mm',
      batteryLife: '50 hours'
    },
    usage: 'High-magnification inspection of fiber end faces, connectors, and splice quality',
    maintenance: {
      cleaning: 'Daily - Clean lenses and fiber holder',
      calibration: 'Monthly - Check magnification accuracy',
      service: 'As needed - Replace LED if dim',
      lastService: '2024-09-15',
      nextService: '2025-01-15'
    },
    safety: [
      'Never look directly at bright LED',
      'Handle with care to avoid lens damage',
      'Keep fiber holder clean',
      'Store in protective case'
    ],
    tutorials: [
      'Fiber end face inspection',
      'Connector quality assessment',
      'Splice quality evaluation',
      'Microscope maintenance'
    ],
    status: 'available',
    location: 'Inspection Station D',
    lastUsed: '2024-12-06'
  },
  {
    id: 'splice-protection-heat-shrink',
    name: 'Heat Shrink Splice Protection',
    category: 'consumables',
    barcode: 'HS-SP-001',
    qrCode: 'HS-SP-001',
    specifications: {
      types: 'Single fiber, ribbon fiber',
      materials: 'Heat shrinkable tube with metal strength member',
      temperature: '120°C for 2 minutes',
      length: '60mm',
      diameter: '2.4mm',
      quantity: '100 pieces per box'
    },
    usage: 'Protection and reinforcement of fusion splices to prevent damage and maintain performance',
    maintenance: {
      cleaning: 'Not applicable - disposable item',
      calibration: 'Not applicable',
      service: 'Not applicable',
      lastService: 'N/A',
      nextService: 'N/A'
    },
    safety: [
      'Use appropriate heat source',
      'Allow proper cooling time',
      'Check for proper shrinkage',
      'Store in dry environment'
    ],
    tutorials: [
      'Splice protection application',
      'Heat shrinking technique',
      'Quality verification',
      'Storage and handling'
    ],
    status: 'available',
    location: 'Consumables Storage',
    lastUsed: '2024-12-10'
  },
  {
    id: 'connector-polishing-film',
    name: 'Connector Polishing Film',
    category: 'consumables',
    barcode: 'CPF-001',
    qrCode: 'CPF-001',
    specifications: {
      grits: '9μm, 3μm, 1μm, 0.3μm',
      size: '100x100mm',
      material: 'Aluminum oxide on polyester',
      quantity: '50 sheets per grit',
      temperature: 'Room temperature'
    },
    usage: 'Multi-step polishing process for fiber optic connectors to achieve optimal end face quality',
    maintenance: {
      cleaning: 'Not applicable - disposable item',
      calibration: 'Not applicable',
      service: 'Not applicable',
      lastService: 'N/A',
      nextService: 'N/A'
    },
    safety: [
      'Handle with clean hands',
      'Use in proper sequence',
      'Dispose of used film properly',
      'Store in dry environment'
    ],
    tutorials: [
      'Polishing sequence',
      'Quality assessment',
      'Film replacement',
      'End face inspection'
    ],
    status: 'available',
    location: 'Consumables Storage',
    lastUsed: '2024-12-08'
  },
  {
    id: 'fiber-cleaning-kit',
    name: 'Fiber Cleaning Kit',
    category: 'maintenance',
    barcode: 'FCK-001',
    qrCode: 'FCK-001',
    specifications: {
      contents: 'Cleaning swabs, lint-free wipes, isopropyl alcohol',
      swabTypes: 'Dry and wet cleaning swabs',
      alcoholConcentration: '99.9%',
      quantity: '100 swabs, 50 wipes, 100ml alcohol',
      temperature: 'Room temperature'
    },
    usage: 'Comprehensive cleaning solution for fiber optic connectors, equipment, and work surfaces',
    maintenance: {
      cleaning: 'Not applicable - cleaning supplies',
      calibration: 'Not applicable',
      service: 'Not applicable',
      lastService: 'N/A',
      nextService: 'N/A'
    },
    safety: [
      'Use in well-ventilated area',
      'Avoid contact with skin',
      'Store away from heat sources',
      'Follow chemical safety guidelines'
    ],
    tutorials: [
      'Connector cleaning technique',
      'Equipment maintenance',
      'Chemical safety',
      'Storage procedures'
    ],
    status: 'available',
    location: 'Maintenance Station',
    lastUsed: '2024-12-10'
  }
]

export const toolCategories = [
  { id: 'splicing', name: 'Splicing Equipment', icon: '🔧', color: 'blue' },
  { id: 'testing', name: 'Testing Equipment', icon: '📊', color: 'green' },
  { id: 'preparation', name: 'Preparation Tools', icon: '✂️', color: 'orange' },
  { id: 'inspection', name: 'Inspection Tools', icon: '🔍', color: 'purple' },
  { id: 'consumables', name: 'Consumables', icon: '📦', color: 'gray' },
  { id: 'maintenance', name: 'Maintenance', icon: '🛠️', color: 'red' }
]

export const getToolByBarcode = (barcode) => {
  return fiberToolsDatabase.find(tool => tool.barcode === barcode || tool.qrCode === barcode)
}

export const getToolsByCategory = (category) => {
  return fiberToolsDatabase.filter(tool => tool.category === category)
}

export const getAvailableTools = () => {
  return fiberToolsDatabase.filter(tool => tool.status === 'available')
}

export const getToolsNeedingMaintenance = () => {
  const today = new Date()
  return fiberToolsDatabase.filter(tool => {
    if (!tool.maintenance.nextService) return false
    const nextService = new Date(tool.maintenance.nextService)
    return nextService <= today
  })
}
