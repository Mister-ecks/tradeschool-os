'use client'

import { useState } from 'react'
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Clock, 
  Target,
  Flame,
  Award,
  ChevronUp,
  ChevronDown,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const timeframes = ['This Week', 'This Month', 'All Time']
const categories = ['Overall', 'HVAC', 'Electrical', 'Plumbing', 'Welding']

// Sample leaderboard data
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: 'Sarah Martinez',
    avatar: 'SM',
    score: 2847,
    courses: 8,
    completed: 6,
    streak: 15,
    category: 'HVAC',
    change: '+2',
    badges: ['Top Performer', 'Streak Master']
  },
  {
    id: 2,
    rank: 2,
    name: 'Mike Rodriguez',
    avatar: 'MR',
    score: 2654,
    courses: 6,
    completed: 5,
    streak: 12,
    category: 'Electrical',
    change: '+1',
    badges: ['Quick Learner']
  },
  {
    id: 3,
    rank: 3,
    name: 'Emily Chen',
    avatar: 'EC',
    score: 2432,
    courses: 7,
    completed: 4,
    streak: 8,
    category: 'Plumbing',
    change: '-1',
    badges: ['Consistent']
  },
  {
    id: 4,
    rank: 4,
    name: 'David Johnson',
    avatar: 'DJ',
    score: 2298,
    courses: 5,
    completed: 4,
    streak: 6,
    category: 'HVAC',
    change: '+3',
    badges: ['Rising Star']
  },
  {
    id: 5,
    rank: 5,
    name: 'Lisa Wang',
    avatar: 'LW',
    score: 2156,
    courses: 6,
    completed: 3,
    streak: 9,
    category: 'Welding',
    change: '-2',
    badges: ['Dedicated']
  },
  {
    id: 6,
    rank: 6,
    name: 'James Wilson',
    avatar: 'JW',
    score: 2034,
    courses: 4,
    completed: 3,
    streak: 7,
    category: 'Electrical',
    change: '+1',
    badges: ['Focused']
  },
  {
    id: 7,
    rank: 7,
    name: 'Maria Garcia',
    avatar: 'MG',
    score: 1987,
    courses: 5,
    completed: 2,
    streak: 5,
    category: 'Plumbing',
    change: '-1',
    badges: ['Steady Progress']
  },
  {
    id: 8,
    rank: 8,
    name: 'Alex Thompson',
    avatar: 'AT',
    score: 1876,
    courses: 3,
    completed: 2,
    streak: 4,
    category: 'HVAC',
    change: '+2',
    badges: ['Newcomer']
  },
  {
    id: 9,
    rank: 9,
    name: 'Rachel Brown',
    avatar: 'RB',
    score: 1754,
    courses: 4,
    completed: 2,
    streak: 3,
    category: 'Welding',
    change: '0',
    badges: ['Determined']
  },
  {
    id: 10,
    rank: 10,
    name: 'Kevin Lee',
    avatar: 'KL',
    score: 1632,
    courses: 3,
    completed: 1,
    streak: 2,
    category: 'Electrical',
    change: '+1',
    badges: ['Getting Started']
  }
]

const getRankIcon = (rank) => {
  if (rank === 1) return Trophy
  if (rank === 2) return Medal
  if (rank === 3) return Award
  return null
}

const getRankColor = (rank) => {
  if (rank === 1) return 'text-yellow-600'
  if (rank === 2) return 'text-gray-600'
  if (rank === 3) return 'text-amber-600'
  return 'text-gray-500'
}

const getChangeColor = (change) => {
  if (change.startsWith('+')) return 'text-green-600'
  if (change.startsWith('-')) return 'text-red-600'
  return 'text-gray-500'
}

const getCategoryColor = (category) => {
  const colors = {
    'HVAC': 'hvac',
    'Electrical': 'primary',
    'Plumbing': 'primary',
    'Welding': 'trade',
    'Overall': 'gray'
  }
  return colors[category] || 'gray'
}

export function Leaderboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month')
  const [selectedCategory, setSelectedCategory] = useState('Overall')
  const [sortBy, setSortBy] = useState('score')

  const filteredData = leaderboardData.filter(item => {
    if (selectedCategory === 'Overall') return true
    return item.category === selectedCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score
      case 'streak':
        return b.streak - a.streak
      case 'courses':
        return b.courses - a.courses
      case 'completed':
        return b.completed - a.completed
      default:
        return a.rank - b.rank
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how you stack up against other learners. Compete, learn, and climb the ranks!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Timeframe Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <div className="flex space-x-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      selectedTimeframe === timeframe
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="score">Total Score</option>
                <option value="streak">Current Streak</option>
                <option value="courses">Courses Enrolled</option>
                <option value="completed">Courses Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...leaderboardData.map(item => item.score)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Learners</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leaderboardData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Longest Streak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...leaderboardData.map(item => item.streak))} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(leaderboardData.reduce((acc, item) => acc + (item.completed / item.courses), 0) / leaderboardData.length * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedCategory} Leaderboard - {selectedTimeframe}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((learner, index) => {
                  const RankIcon = getRankIcon(learner.rank)
                  const progressPercentage = Math.round((learner.completed / learner.courses) * 100)
                  
                  return (
                    <tr key={learner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {RankIcon ? (
                            <RankIcon className={cn("w-6 h-6 mr-2", getRankColor(learner.rank))} />
                          ) : (
                            <span className="w-6 h-6 mr-2 flex items-center justify-center text-sm font-bold text-gray-500">
                              {learner.rank}
                            </span>
                          )}
                          <span className={cn("text-sm font-bold", getRankColor(learner.rank))}>
                            #{learner.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-600">
                              {learner.avatar}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {learner.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {learner.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {learner.score.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {learner.completed}/{learner.courses}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Flame className="w-4 h-4 text-orange-500 mr-1" />
                          {learner.streak} days
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={cn(
                          "flex items-center text-sm font-medium",
                          getChangeColor(learner.change)
                        )}>
                          {learner.change.startsWith('+') ? (
                            <ChevronUp className="w-4 h-4 mr-1" />
                          ) : learner.change.startsWith('-') ? (
                            <ChevronDown className="w-4 h-4 mr-1" />
                          ) : null}
                          {learner.change}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {learner.badges.slice(0, 2).map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                            >
                              {badge}
                            </span>
                          ))}
                          {learner.badges.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              +{learner.badges.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Position (if logged in) */}
        <div className="mt-8 bg-primary-50 rounded-lg border border-primary-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary-900">
                Your Position
              </h3>
              <p className="text-primary-700">
                Sign in to see your rank and compete with other learners!
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



