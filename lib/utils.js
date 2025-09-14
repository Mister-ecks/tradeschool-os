import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) {
    return `${mins}m`
  }
  
  if (mins === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${mins}m`
}

export function formatScore(score, total) {
  const percentage = Math.round((score / total) * 100)
  return `${score}/${total} (${percentage}%)`
}

export function generateQRCode(data) {
  // In a real implementation, you'd use a QR code library
  // For now, return a placeholder URL
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`
}

export function getTradeColor(tradeType) {
  const colors = {
    hvac: 'hvac',
    electrical: 'yellow',
    plumbing: 'blue',
    welding: 'orange',
    construction: 'gray',
    solar: 'green',
    robotics: 'purple',
  }
  
  return colors[tradeType] || 'primary'
}

export function getTradeName(tradeType) {
  const names = {
    hvac: 'HVAC',
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    welding: 'Welding',
    construction: 'Construction',
    solar: 'Solar Energy',
    robotics: 'Robotics',
  }
  
  return names[tradeType] || tradeType
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password) {
  const errors = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function calculateProgress(completed, total) {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function debounce(func, wait) {
  let timeout = null
  
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle = false
  
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

