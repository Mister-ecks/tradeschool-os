'use client'

import { useState } from 'react'
import { 
  Snowflake, 
  Wrench, 
  Package, 
  ShoppingCart, 
  Star, 
  Heart,
  QrCode,
  BookOpen,
  CheckCircle,
  Filter,
  Search,
  Truck,
  Shield,
  Video
} from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', name: 'All Equipment', icon: Package },
  { id: 'hvac', name: 'HVAC Systems', icon: Snowflake },
  { id: 'tools', name: 'Tools & Instruments', icon: Wrench },
  { id: 'kits', name: 'Training Kits', icon: BookOpen },
]

const equipment = [
  {
    id: 1,
    name: 'Complete HVAC Training Kit',
    description: 'Professional HVAC training kit with all essential tools and components for hands-on learning.',
    category: 'hvac',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 127,
    inStock: true,
    image: '/equipment/hvac-kit.jpg',
    features: [
      'Digital Multimeter',
      'Refrigerant Gauges',
      'Leak Detector',
      'Thermometer Set',
      'Electrical Test Kit'
    ],
    specifications: {
      weight: '15.2 lbs',
      dimensions: '24" x 18" x 8"',
      warranty: '2 years',
      certification: 'EPA 608 Ready'
    }
  },
  {
    id: 2,
    name: 'Professional Tool Set',
    description: 'Comprehensive tool set for electrical and plumbing work with premium quality tools.',
    category: 'tools',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 89,
    inStock: true,
    image: '/equipment/tool-set.jpg',
    features: [
      '50+ Professional Tools',
      'Hard Case Included',
      'Lifetime Warranty',
      'Anti-Slip Grips',
      'Magnetic Holders'
    ],
    specifications: {
      weight: '22.5 lbs',
      dimensions: '32" x 16" x 6"',
      warranty: 'Lifetime',
      certification: 'Professional Grade'
    }
  },
  {
    id: 3,
    name: 'CDL Training Simulator',
    description: 'Advanced driving simulator for CDL training with realistic scenarios and feedback.',
    category: 'kits',
    price: 2499,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 45,
    inStock: false,
    image: '/equipment/cdl-simulator.jpg',
    features: [
      'Realistic Driving Physics',
      'Multiple Vehicle Types',
      'Weather Conditions',
      'Traffic Scenarios',
      'Performance Analytics'
    ],
    specifications: {
      weight: '85 lbs',
      dimensions: '48" x 36" x 24"',
      warranty: '3 years',
      certification: 'DOT Approved'
    }
  },
  {
    id: 4,
    name: 'Electrical Safety Kit',
    description: 'Complete electrical safety equipment for training and certification programs.',
    category: 'tools',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: '/equipment/electrical-safety.jpg',
    features: [
      'Insulated Gloves',
      'Safety Glasses',
      'Voltage Tester',
      'Lockout/Tagout Kit',
      'Safety Manual'
    ],
    specifications: {
      weight: '8.5 lbs',
      dimensions: '18" x 12" x 6"',
      warranty: '1 year',
      certification: 'OSHA Compliant'
    }
  },
  {
    id: 5,
    name: 'Welding Training Station',
    description: 'Complete welding training station with MIG, TIG, and stick welding capabilities.',
    category: 'kits',
    price: 1899,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 73,
    inStock: true,
    image: '/equipment/welding-station.jpg',
    features: [
      'Multi-Process Welder',
      'Safety Equipment',
      'Practice Materials',
      'Instruction Manual',
      'Video Tutorials'
    ],
    specifications: {
      weight: '45 lbs',
      dimensions: '36" x 24" x 18"',
      warranty: '2 years',
      certification: 'AWS Approved'
    }
  },
  {
    id: 6,
    name: 'Plumbing Training Kit',
    description: 'Complete plumbing training kit with pipes, fittings, and tools for hands-on learning.',
    category: 'tools',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 94,
    inStock: true,
    image: '/equipment/plumbing-kit.jpg',
    features: [
      'Various Pipe Sizes',
      'Fitting Collection',
      'Pipe Cutters',
      'Threading Tools',
      'Leak Detection Kit'
    ],
    specifications: {
      weight: '18.5 lbs',
      dimensions: '28" x 20" x 10"',
      warranty: '1 year',
      certification: 'Code Compliant'
    }
  }
]

export function Equipment() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.icon : Package
  }

  const getCategoryColor = (categoryId) => {
    const colors = {
      hvac: 'hvac',
      tools: 'primary',
      kits: 'trade'
    }
    return colors[categoryId] || 'primary'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Equipment & Training Kits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get hands-on experience with professional-grade equipment and training kits 
              designed for skilled trades education.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => {
            const CategoryIcon = getCategoryIcon(item.category)
            const colorClass = getCategoryColor(item.category)
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Equipment Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CategoryIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Equipment Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${colorClass}-100 text-${colorClass}-700`}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {item.category.toUpperCase()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {item.rating} ({item.reviews})
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          +{item.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mb-4 text-sm text-gray-600">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Weight: {item.specifications.weight}</div>
                      <div>Warranty: {item.specifications.warranty}</div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          ${item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ${item.originalPrice - item.price}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <QrCode className="w-5 h-5" />
                      </button>
                      <button
                        disabled={!item.inStock}
                        className={cn(
                          "inline-flex items-center px-4 py-2 font-semibold rounded-lg transition-colors",
                          item.inStock
                            ? "bg-primary-600 text-white hover:bg-primary-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        )}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No equipment found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



