import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/client';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      studentId, 
      module, 
      lessonId,
      results,
      score,
      currentStep,
      uploadedPhotos,
      quizAnswers,
      scanResult,
      timestamp
    } = body;

    // Validate required fields
    if (!studentId || !module) {
      return NextResponse.json(
        { error: 'Student ID and module are required' },
        { status: 400 }
      );
    }

    // Find or create student
    let student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      // Create a new student record
      student = await prisma.student.create({
        data: {
          id: studentId,
          email: `${studentId}@tradeschool.com`,
          name: `Student ${studentId}`
        }
      });
    }

    // Find the lesson
    let lesson = null;
    if (lessonId) {
      lesson = await prisma.lesson.findUnique({
        where: { id: lessonId }
      });
    }

    // Save progress data based on module type
    let progressData = {};

    switch (module) {
      case 'road-signs':
        progressData = {
          studentId,
          lessonId: lesson?.id || 'road-signs-default',
          completed: score >= 80, // 80% passing score
          score: (score / (results?.length || 1)) * 100,
          data: {
            results,
            totalQuestions: results?.length || 0,
            correctAnswers: score || 0,
            timestamp: timestamp || new Date().toISOString()
          }
        };
        break;

      case 'youth-repair':
        progressData = {
          studentId,
          lessonId: lesson?.id || 'repair-default',
          completed: currentStep >= 3, // Complete after 3 steps
          score: (quizAnswers ? Object.keys(quizAnswers).length : 0) * 20, // 20 points per quiz
          data: {
            currentStep,
            uploadedPhotos,
            quizAnswers,
            timestamp: timestamp || new Date().toISOString()
          }
        };
        break;

      case 'vr-ar-training':
        progressData = {
          studentId,
          lessonId: lesson?.id || 'vr-ar-default',
          completed: false, // VR/AR is ongoing
          score: 0,
          data: {
            currentScene: body.currentScene || 0,
            mode: body.mode || 'vr',
            interactionCount: body.interactionCount || 0,
            timestamp: timestamp || new Date().toISOString()
          }
        };
        break;

      case 'tool-recognition':
        progressData = {
          studentId,
          lessonId: lesson?.id || 'tool-recognition-default',
          completed: false, // Ongoing scanning
          score: 0,
          data: {
            scanResult,
            timestamp: timestamp || new Date().toISOString()
          }
        };
        break;

      default:
        progressData = {
          studentId,
          lessonId: lesson?.id || 'default',
          completed: false,
          score: 0,
          data: {
            module,
            timestamp: timestamp || new Date().toISOString()
          }
        };
    }

    // Save or update progress
    const progress = await prisma.progress.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId: progressData.lessonId
        }
      },
      update: {
        completed: progressData.completed,
        score: progressData.score,
        data: progressData.data,
        updatedAt: new Date()
      },
      create: progressData
    });

    // If this is a quiz attempt, save the attempt
    if (results && module === 'road-signs') {
      await prisma.attempt.create({
        data: {
          quizId: 'road-signs-quiz', // This would be a real quiz ID
          studentId,
          answers: results,
          score: (score / results.length) * 100,
          completed: true
        }
      });
    }

    return NextResponse.json({
      success: true,
      progress,
      message: 'Progress saved successfully'
    });

  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const module = searchParams.get('module');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Build where clause
    const where = { studentId };
    if (module) {
      where.lesson = {
        module: {
          category: module
        }
      };
    }

    // Get progress for student
    const progress = await prisma.progress.findMany({
      where,
      include: {
        lesson: {
          include: {
            module: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Get student stats
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        _count: {
          select: {
            progress: true
          }
        }
      }
    });

    const stats = {
      totalModules: progress.length,
      completedModules: progress.filter(p => p.completed).length,
      averageScore: progress.length > 0 
        ? progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length 
        : 0,
      lastActivity: progress[0]?.updatedAt || null
    };

    return NextResponse.json({
      success: true,
      student,
      progress,
      stats
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress', details: error.message },
      { status: 500 }
    );
  }
}
