import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, CheckCircle2, Bookmark, StickyNote,
  Lightbulb, Code2, PlayCircle, Brain, MessageSquare, Eye, EyeOff, Sparkles, Check, X,
  ArrowRight, Award, Zap
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { ALL_MODULES_META } from '@/data/modules/meta';
import { JAVA_LESSONS } from '@/data/modules/java';
import { ADVANCED_JAVA_LESSONS } from '@/data/modules/advancedJava';
import { OOP_LESSONS } from '@/data/modules/oop';
import { DSA_LESSONS } from '@/data/modules/dsa';
import { SQL_LESSONS } from '@/data/modules/sql';
import { SPRING_LESSONS } from '@/data/modules/spring';
import { REACT_LESSONS } from '@/data/modules/react';
import { DEVOPS_LESSONS } from '@/data/modules/devops';
import { SPRING_BOOT_LESSONS } from '@/data/modules/springBoot';
import { REST_API_LESSONS } from '@/data/modules/restApi';
import { DOCKER_LESSONS } from '@/data/modules/docker';
import { GIT_LESSONS } from '@/data/modules/git';
import { LINUX_LESSONS } from '@/data/modules/linux';
import { AWS_LESSONS } from '@/data/modules/aws';
import { TESTING_LESSONS } from '@/data/modules/testing';
import { SYSTEM_DESIGN_LESSONS } from '@/data/modules/systemDesign';
import { SECURITY_LESSONS } from '@/data/modules/security';
import { HTML_LESSONS } from '@/data/modules/html';
import { CSS_LESSONS } from '@/data/modules/css';
import { JAVASCRIPT_LESSONS } from '@/data/modules/javascript';
import { NETWORKING_LESSONS } from '@/data/modules/networking';
import VisualizerRegistry from '@/components/visualizers/VisualizerRegistry';
import type { ModuleKey, Lesson } from '@/types';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { saveBookmark, deleteBookmark, getAllBookmarks, saveNote, getNotesByLesson } from '@/services/db';
import { clsx } from 'clsx';

// Aggregate lesson registry across curriculum
const MODULE_LESSONS: Record<string, Lesson[]> = {
  java: JAVA_LESSONS,
  'advanced-java': ADVANCED_JAVA_LESSONS,
  oop: OOP_LESSONS,
  dsa: DSA_LESSONS,
  sql: SQL_LESSONS,
  spring: SPRING_LESSONS,
  'spring-boot': SPRING_BOOT_LESSONS,
  'rest-api': REST_API_LESSONS,
  react: REACT_LESSONS,
  docker: DOCKER_LESSONS,
  git: GIT_LESSONS,
  linux: LINUX_LESSONS,
  aws: AWS_LESSONS,
  testing: TESTING_LESSONS,
  'system-design': SYSTEM_DESIGN_LESSONS,
  security: SECURITY_LESSONS,
  html: HTML_LESSONS,
  css: CSS_LESSONS,
  javascript: JAVASCRIPT_LESSONS,
  networking: NETWORKING_LESSONS,
  devops: DEVOPS_LESSONS,
};

function getFallbackVisualizer(moduleKey: ModuleKey, slug: string): string | undefined {
  if (moduleKey === 'java') {
    return slug.includes('jvm') || slug.includes('compile') || slug.includes('intro') ? 'jvm-compilation' : undefined;
  }
  if (moduleKey === 'oop') return 'oop-inheritance';
  if (moduleKey === 'dsa') return 'dsa-sorting';
  if (moduleKey === 'sql') return 'sql-joins';
  if (moduleKey === 'git') return 'git-workflow';
  if (moduleKey === 'spring' || moduleKey === 'spring-boot' || moduleKey === 'rest-api') return 'rest-lifecycle';
  if (moduleKey === 'react') return 'react-reconciliation';
  if (moduleKey === 'docker') return 'docker-architecture';
  if (moduleKey === 'linux') return 'linux-terminal';
  return undefined;
}

function getLessons(moduleKey: ModuleKey): Lesson[] {
  const custom = MODULE_LESSONS[moduleKey];
  if (custom && custom.length > 0) return custom;
  const meta = ALL_MODULES_META.find(m => m.key === moduleKey);
  if (!meta) return [];

  return meta.lessons.map((l, i) => ({
    id: l.id,
    moduleKey,
    title: l.title,
    slug: l.slug,
    difficulty: 'beginner' as const,
    duration: 10,
    order: i + 1,
    prerequisites: [],
    tags: l.tags || [moduleKey],
    explanation: l.explanation,
    beginnerExplanation: `In this section of ${meta.title}, you will understand ${l.title} in straightforward terms with clear architecture patterns.`,
    technicalExplanation: `${l.explanation} In production systems, this concept is critical to building reliable, high-throughput architectures.`,
    keyPoints: [
      `Key foundation for ${l.title} in modern enterprise software`,
      'Architected for high throughput, maintainability, and clean code',
      'Follows industry best practices and cloud-native standards'
    ],
    codeExample: `// Implementation: ${l.title}\npublic class ${l.title.replace(/[^a-zA-Z]/g, '')}Service {\n    public static void main(String[] args) {\n        System.out.println("Executing ${l.title} on Knowhere Tech");\n    }\n}`,
    codeLanguage: 'java',
    codeLines: [
      { code: `public class ${l.title.replace(/[^a-zA-Z]/g, '')}Service {`, token: 'public class', explanation: `Standard entry point declaration for ${l.title}.` },
      { code: '    public static void main(String[] args) {', token: 'main', explanation: 'Execution entry point for this concept.' }
    ],
    visualizer: getFallbackVisualizer(moduleKey, l.slug),
    quiz: [
      {
        id: `q-${l.id}-1`,
        type: 'mcq',
        question: `What is the primary role of ${l.title} in software engineering?`,
        options: [
          'Enhance modularity, performance, and maintainability',
          'Only useful for legacy monolithic codebases',
          'Replaced completely by basic HTML',
          'Not used in production'
        ],
        answer: 0,
        explanation: `${l.title} ensures clean architecture, maintainability, and scalability.`,
        points: 10
      }
    ],
    practice: [
      {
        id: `p-${l.id}-1`,
        type: 'predict-output',
        question: `What is the core takeaway of ${l.title}?`,
        code: `System.out.println("${l.title} Initialized");`,
        answer: `${l.title} Initialized`,
        hint: 'Inspect the string argument passed to println.'
      }
    ],
    interviewQuestions: [
      {
        id: `iq-${l.id}-1`,
        question: `How is ${l.title} applied in real-world Java Full Stack systems?`,
        level: 'intermediate',
        answer: `${l.title} is utilized across production services to structure business logic, optimize data flow, and ensure standard compliance in enterprise software.`,
        example: `Used extensively in distributed microservice architectures.`
      }
    ],
    xpReward: 20
  }));
}

// --- Spacious Line-By-Line Code Explainer ---
function CodeExplainer({ lesson }: { lesson: Lesson }) {
  const [selectedLine, setSelectedLine] = useState<number | null>(0);
  const [showExplainer, setShowExplainer] = useState(true);

  if (!lesson.codeExample) return null;

  return (
    <div className="panel p-6 lg:p-8 mb-8 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2.5 font-bold text-white text-base lg:text-lg">
          <Code2 size={20} className="text-emerald-400" /> Syntax & Code Explainer
        </h3>
        <button
          onClick={() => setShowExplainer(!showExplainer)}
          className="button-secondary text-xs !py-2 !px-3.5"
        >
          {showExplainer ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showExplainer ? 'Code Only' : 'Inspect Syntax'}</span>
        </button>
      </div>

      <div className={clsx('grid gap-6', showExplainer ? 'lg:grid-cols-12' : 'grid-cols-1')}>
        {/* Code View Panel */}
        <div className={showExplainer ? 'lg:col-span-7' : 'w-full'}>
          <div className="code-block relative text-sm p-5">
            {lesson.codeExample.split('\n').map((line, idx) => {
              const matchingMeta = lesson.codeLines?.find(cl => cl.code.trim() === line.trim());
              const isSelected = selectedLine === idx;
              const hasExplanation = !!matchingMeta;

              return (
                <div
                  key={idx}
                  onClick={() => hasExplanation && setSelectedLine(idx)}
                  className={clsx(
                    'font-mono py-1 px-3 rounded-lg -mx-1 transition-colors flex items-center justify-between',
                    hasExplanation && 'cursor-pointer hover:bg-emerald-950/40',
                    isSelected && 'bg-emerald-950/70 border-l-2 border-emerald-400 text-emerald-300 font-bold'
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-zinc-600 select-none text-xs w-6 text-right shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate text-emerald-100">{line || ' '}</span>
                  </div>
                  {hasExplanation && (
                    <span className="text-[10px] text-emerald-400 font-mono shrink-0 ml-3 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">inspect</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Explanation Drawer */}
        {showExplainer && (
          <div className="lg:col-span-5 rounded-2xl border border-[#142a20] bg-black/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                <Sparkles size={16} className="text-emerald-400" />
                <span className="font-bold uppercase tracking-wider text-xs font-mono">
                  Syntax Inspector
                </span>
              </div>

              {selectedLine !== null && (() => {
                const lineText = lesson.codeExample!.split('\n')[selectedLine];
                const matchingMeta = lesson.codeLines?.find(cl => cl.code.trim() === lineText?.trim());
                if (!matchingMeta) {
                  return (
                    <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                      Click any highlighted line in the code block to inspect its runtime token mechanics and compile behavior.
                    </p>
                  );
                }
                return (
                  <div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 font-mono text-sm text-emerald-300 mb-3 font-bold">
                      {matchingMeta.token || lineText.trim()}
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {matchingMeta.explanation}
                    </p>
                  </div>
                );
              })()}
            </div>
            <p className="text-xs text-zinc-500 mt-6 pt-3 border-t border-[#142a20] font-mono">
              Knowhere Tech Engine
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Dynamic Quiz Engine ---
function QuizEngine({ lesson, onComplete }: { lesson: Lesson; onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!lesson.quiz || lesson.quiz.length === 0) return null;

  const q = lesson.quiz[currentQ];
  const isCorrect = selectedOpt === q.answer;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOpt(idx);
  };

  const handleCheck = () => {
    if (selectedOpt === null) return;
    setShowResult(true);
    if (selectedOpt === q.answer) {
      setScore(s => s + q.points);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= lesson.quiz.length) {
      const maxScore = lesson.quiz.reduce((acc, item) => acc + (item.points || 10), 0) || 1;
      const finalPct = Math.min(100, Math.round(((score + (isCorrect ? 0 : 0)) / maxScore) * 100));
      onComplete(finalPct);
      setIsFinished(true);
    } else {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setShowResult(false);
    }
  };

  const maxPoints = lesson.quiz.reduce((acc, item) => acc + (item.points || 10), 0) || 1;

  if (isFinished) {
    const finalPct = Math.min(100, Math.round((score / maxPoints) * 100));
    return (
      <div className="panel p-8 lg:p-10 mb-8 text-center rounded-3xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-bold text-xl mb-2 text-white">Quiz Completed</h3>
        <p className="text-zinc-400 text-sm mb-4">
          Score: {score} of {maxPoints} points ({finalPct}%)
        </p>
        <div className="w-56 mx-auto">
          <ProgressBar value={finalPct} size="md" color={finalPct >= 80 ? 'primary' : 'warning'} />
        </div>
      </div>
    );
  }

  return (
    <div className="panel p-7 lg:p-8 mb-8 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2.5 font-bold text-base lg:text-lg text-white">
          <Brain size={20} className="text-emerald-400" /> Concept Check Quiz
        </h3>
        <span className="text-zinc-400 text-xs font-mono">
          Question {currentQ + 1} of {lesson.quiz.length}
        </span>
      </div>

      <ProgressBar value={((currentQ + (showResult ? 1 : 0)) / lesson.quiz.length) * 100} size="sm" className="mb-6" />

      <h4 className="text-base font-semibold mb-4 text-white leading-snug">{q.question}</h4>

      <div className="space-y-3 mb-6">
        {q.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={clsx(
              'w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between',
              !showResult && selectedOpt === i
                ? 'border-emerald-500 bg-emerald-950/50 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-300'
                : !showResult
                ? 'border-[#142a20] bg-black/50 hover:border-emerald-500/40 text-zinc-300'
                : i === q.answer
                ? 'border-emerald-400 bg-emerald-950/70 text-emerald-300 font-bold'
                : selectedOpt === i
                ? 'border-rose-500/80 bg-rose-950/50 text-rose-300'
                : 'border-[#142a20] bg-black/50 text-zinc-600'
            )}
          >
            <div>
              <span className="font-mono mr-3 text-zinc-500 font-bold">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </div>
            {showResult && i === q.answer && <Check size={18} className="text-emerald-400 shrink-0 ml-3" />}
            {showResult && selectedOpt === i && i !== q.answer && <X size={18} className="text-rose-400 shrink-0 ml-3" />}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={clsx('p-4 rounded-2xl border text-sm mb-6 leading-relaxed', isCorrect ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' : 'bg-amber-950/40 border-amber-800/60 text-amber-300')}>
          <p className="font-bold mb-1">{isCorrect ? 'Correct Answer' : 'Incorrect'}</p>
          <p className="text-zinc-300">{q.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!showResult ? (
          <button
            disabled={selectedOpt === null}
            onClick={handleCheck}
            className="button-primary text-sm !py-3 !px-6"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="button-primary text-sm !py-3 !px-6"
          >
            {currentQ + 1 >= lesson.quiz.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}

// --- Practice Tasks ---
function PracticeSection({ lesson }: { lesson: Lesson }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  if (!lesson.practice || lesson.practice.length === 0) return null;

  return (
    <div className="panel p-7 lg:p-8 mb-8 rounded-3xl">
      <h3 className="flex items-center gap-2.5 font-bold text-base lg:text-lg mb-6 text-white">
        <PlayCircle size={20} className="text-emerald-400" /> Practice Coding Challenge
      </h3>
      <div className="space-y-4">
        {lesson.practice.map(p => (
          <div key={p.id} className="p-6 rounded-2xl bg-black/60 border border-[#142a20]">
            <Badge variant="primary" size="xs" className="mb-3 uppercase tracking-wider">{p.type.replace('-', ' ')}</Badge>
            <p className="text-sm font-semibold text-white mb-3">{p.question}</p>
            {p.code && <pre className="code-block text-sm mb-4 font-mono">{p.code}</pre>}
            <button
              onClick={() => setRevealed(prev => {
                const next = new Set(prev);
                if (next.has(p.id)) {
                  next.delete(p.id);
                } else {
                  next.add(p.id);
                }
                return next;
              })}
              className="button-secondary text-xs !py-2 !px-4"
            >
              {revealed.has(p.id) ? 'Hide Solution' : 'Reveal Solution'}
            </button>
            {revealed.has(p.id) && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 font-mono text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed">
                {p.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Interview Prep Card ---
function InterviewSection({ lesson }: { lesson: Lesson }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  if (!lesson.interviewQuestions || lesson.interviewQuestions.length === 0) return null;

  return (
    <div className="panel p-7 lg:p-8 mb-8 rounded-3xl">
      <h3 className="flex items-center gap-2.5 font-bold text-base lg:text-lg mb-6 text-white">
        <MessageSquare size={20} className="text-teal-400" /> Technical Interview Discussion
      </h3>
      <div className="space-y-4">
        {lesson.interviewQuestions.map(iq => (
          <div key={iq.id} className="rounded-2xl bg-black/60 border border-[#142a20] overflow-hidden">
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <Badge variant={iq.level} size="xs" className="mb-2">{iq.level.charAt(0).toUpperCase() + iq.level.slice(1)}</Badge>
                <h4 className="text-sm font-semibold text-white leading-snug">{iq.question}</h4>
              </div>
              <button
                onClick={() => setRevealed(prev => {
                  const next = new Set(prev);
                  if (next.has(iq.id)) {
                    next.delete(iq.id);
                  } else {
                    next.add(iq.id);
                  }
                  return next;
                })}
                className="button-secondary text-xs !py-2 !px-4 shrink-0"
              >
                {revealed.has(iq.id) ? 'Hide' : 'Answer'}
              </button>
            </div>
            {revealed.has(iq.id) && (
              <div className="p-5 bg-black/90 border-t border-[#142a20] text-sm text-zinc-300 leading-relaxed">
                <p className="whitespace-pre-line mb-3">{iq.answer}</p>
                {iq.example && (
                  <pre className="code-block text-xs font-mono text-emerald-400 mt-3">{iq.example}</pre>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main LessonPage Component ---
export default function LessonPage({ moduleKey }: { moduleKey: ModuleKey }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { progress, completeLesson, awardXP } = useLearning();

  const [beginnerMode, setBeginnerMode] = useState(true);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const lessons = getLessons(moduleKey);
  const lessonIdx = lessons.findIndex(l => l.slug === slug);
  const lesson = lessons[lessonIdx] || lessons[0];
  const prevLesson = lessons[lessonIdx - 1];
  const nextLesson = lessons[lessonIdx + 1];

  const lessonProgress = lesson ? progress?.lessons?.[lesson.id] : null;
  const isCompleted = lessonProgress?.status === 'completed';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (lesson) {
      getNotesByLesson(lesson.id).then(notes => {
        if (notes.length > 0) setNoteText(notes[0].content);
        else setNoteText('');
      });
      getAllBookmarks().then(bms => {
        setIsBookmarked(bms.some(b => b.referenceId === lesson.id || b.id === `bm-${lesson.id}`));
      });
    }
  }, [slug, lesson]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="text-zinc-400 mb-6 text-lg">Lesson not found.</p>
        <button onClick={() => navigate(`/${moduleKey}`)} className="button-secondary text-sm">
          Back to Module
        </button>
      </div>
    );
  }

  const handleMarkComplete = () => {
    if (isCompleted) return;
    completeLesson(lesson.id, moduleKey, quizScore ?? undefined);
    // XP is already awarded inside markLessonComplete via addXP
  };

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      await deleteBookmark(`bm-${lesson.id}`);
      setIsBookmarked(false);
    } else {
      await saveBookmark({
        id: `bm-${lesson.id}`,
        type: 'lesson',
        referenceId: lesson.id,
        title: lesson.title,
        moduleKey,
        createdAt: new Date().toISOString()
      });
      setIsBookmarked(true);
    }
  };

  const handleSaveNote = async () => {
    if (!noteText.trim()) return;
    await saveNote({
      id: `note-${lesson.id}`,
      lessonId: lesson.id,
      moduleKey,
      content: noteText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 selection:bg-emerald-500/30">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-mono">
        <button onClick={() => navigate('/roadmap')} className="hover:text-emerald-400 transition-colors">Roadmap</button>
        <ChevronRight size={14} />
        <button onClick={() => navigate(`/${moduleKey}`)} className="hover:text-emerald-400 transition-colors capitalize">{moduleKey}</button>
        <ChevronRight size={14} />
        <span className="text-emerald-400 truncate font-semibold">{lesson.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={lesson.difficulty}>{lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}</Badge>
            <span className="text-xs text-zinc-400 font-mono">{lesson.duration} min</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">+{lesson.xpReward} XP</span>
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold ml-2 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/50">
                <CheckCircle2 size={14} /> Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight">
            {lesson.title}
          </h1>
        </div>

        {/* Controls: Mode toggle + Bookmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex bg-black/60 p-1 rounded-2xl border border-[#142a20] text-xs">
            <button
              onClick={() => setBeginnerMode(true)}
              className={clsx(
                'px-4 py-2 rounded-xl font-semibold transition-all',
                beginnerMode ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-zinc-400 hover:text-white'
              )}
            >
              Beginner
            </button>
            <button
              onClick={() => setBeginnerMode(false)}
              className={clsx(
                'px-4 py-2 rounded-xl font-semibold transition-all',
                !beginnerMode ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-zinc-400 hover:text-white'
              )}
            >
              Technical
            </button>
          </div>

          <button
            onClick={handleBookmarkToggle}
            className={clsx(
              'p-3 rounded-2xl border transition-colors',
              isBookmarked
                ? 'border-amber-500/60 bg-amber-950/40 text-amber-300'
                : 'border-[#142a20] bg-black/60 text-zinc-500 hover:text-white'
            )}
            title="Bookmark this lesson"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* Concept Explanation Card */}
      <div className="panel p-7 lg:p-9 mb-8 rounded-3xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2 font-mono">
          <Lightbulb size={16} className="text-amber-400" />
          {beginnerMode ? 'Conceptual Overview' : 'Technical Architecture Specification'}
        </h2>
        <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line mb-6 text-zinc-200">
          {beginnerMode ? lesson.beginnerExplanation : lesson.technicalExplanation}
        </p>

        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="pt-5 border-t border-[#142a20]">
            <h4 className="text-sm font-bold text-white mb-3">Core Takeaways:</h4>
            <ul className="space-y-2">
              {lesson.keyPoints.map((kp, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Visualizer Canvas (ONLY if explicitly matching) */}
      {lesson.visualizer && (
        <VisualizerRegistry id={lesson.visualizer} />
      )}

      {/* Code Explainer */}
      <CodeExplainer lesson={lesson} />

      {/* Practice Tasks */}
      <PracticeSection lesson={lesson} />

      {/* Quiz Engine */}
      <QuizEngine lesson={lesson} onComplete={(score) => { setQuizScore(score); awardXP(30); }} />

      {/* Interview Discussion */}
      <InterviewSection lesson={lesson} />

      {/* Notes Drawer */}
      <div className="panel p-7 lg:p-8 mb-8 rounded-3xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2 font-mono">
            <StickyNote size={16} className="text-amber-400" /> Lesson Engineering Notes
          </h3>
          <button onClick={handleSaveNote} className="button-secondary text-xs !py-2 !px-4">
            Save Notes
          </button>
        </div>
        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Record key technical takeaways and architectural notes (persisted locally in IndexedDB)..."
          rows={4}
          className="w-full bg-black/60 border border-[#142a20] rounded-2xl p-4 text-emerald-100 text-sm outline-none focus:border-emerald-500/50 resize-none font-mono leading-relaxed"
        />
      </div>

      {/* Fully Responsive & Smooth Lesson Conclusion & Navigation Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="panel p-7 lg:p-9 rounded-3xl mt-10 border-[#142a20] bg-ambient-radial"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Status feedback & XP */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-all ${
              isCompleted
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-black/60 border-[#142a20] text-zinc-500'
            }`}>
              {isCompleted ? <CheckCircle2 size={28} /> : <Award size={28} className="text-emerald-400" />}
            </div>
            <div>
              <h3 className="font-bold text-white text-base lg:text-lg">
                {isCompleted ? 'Lesson Mastered!' : 'Ready to Complete This Lesson?'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isCompleted
                  ? `Earned +${lesson.xpReward} XP · Milestone added to your local profile.`
                  : `Mark as complete to claim +${lesson.xpReward} XP and advance your progress.`}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            {prevLesson && (
              <button
                onClick={() => navigate(`/${moduleKey}/${prevLesson.slug}`)}
                className="button-secondary text-xs !py-3 !px-5 flex-1 sm:flex-none"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
            )}

            {!isCompleted ? (
              <button
                onClick={handleMarkComplete}
                className="button-primary text-xs !py-3.5 !px-7 flex-1 sm:flex-none"
              >
                <Zap size={16} />
                <span>Mark Complete (+{lesson.xpReward} XP)</span>
              </button>
            ) : (
              <div className="px-5 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-bold text-xs flex items-center gap-2 font-mono">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Completed</span>
              </div>
            )}

            {nextLesson ? (
              <button
                onClick={() => navigate(`/${moduleKey}/${nextLesson.slug}`)}
                className="button-primary text-xs !py-3.5 !px-7 flex-1 sm:flex-none bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-bold"
              >
                <span>Next Lesson</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => navigate(`/${moduleKey}`)}
                className="button-secondary text-xs !py-3 !px-5 flex-1 sm:flex-none"
              >
                <span>Back to Module</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
