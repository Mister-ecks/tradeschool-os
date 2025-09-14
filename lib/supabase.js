import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Database helper functions
export const db = {
  // User profiles
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Courses and lessons
  async getCourses(tradeType) {
    let query = supabase
      .from('courses')
      .select(`
        *,
        lessons (
          id,
          title,
          duration_minutes,
          order_index
        )
      `)
      .eq('is_published', true)
      .order('order_index')

    if (tradeType) {
      query = query.eq('trade_type', tradeType)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getLesson(lessonId) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses (
          id,
          title,
          trade_type
        )
      `)
      .eq('id', lessonId)
      .single()
    
    if (error) throw error
    return data
  },

  // Progress tracking
  async getUserProgress(userId) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  async updateLessonProgress(userId, lessonId, progress) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        progress_percentage: progress,
        completed: progress >= 100,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  },

  // Quizzes and assessments
  async getQuiz(quizId) {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        questions (
          id,
          question_text,
          question_type,
          options,
          correct_answer,
          points,
          order_index
        )
      `)
      .eq('id', quizId)
      .single()
    
    if (error) throw error
    return data
  },

  async submitQuizAttempt(userId, quizId, answers, score) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        answers: answers,
        score: score,
        completed_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  },

  // Leaderboards
  async getLeaderboard(tradeType, timeframe = '30d') {
    let query = supabase
      .from('leaderboard_view')
      .select('*')
      .order('total_score', { ascending: false })
      .limit(50)

    if (tradeType) {
      query = query.eq('trade_type', tradeType)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Equipment and parts
  async getEquipmentKits(tradeType) {
    let query = supabase
      .from('equipment_kits')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (tradeType) {
      query = query.eq('trade_type', tradeType)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getPartsCatalog(kitId) {
    let query = supabase
      .from('parts')
      .select('*')
      .eq('is_available', true)
      .order('name')

    if (kitId) {
      query = query.eq('kit_id', kitId)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },
}

