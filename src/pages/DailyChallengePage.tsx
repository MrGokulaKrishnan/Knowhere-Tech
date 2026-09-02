import React, { useState } from 'react';
import { Flame, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function DailyChallengePage() {
  const navigate = useNavigate();
  const { progress, awardXP } = useLearning();
  const [completed, setCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleClaim = () => {
    awardXP(50);
    setCompleted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="text-warning" size={24} />
              <h1 className="text-2xl font-display font-bold text-text">
                Daily Developer Challenge
              </h1>
            </div>
            <p className="text-text-muted text-sm">{todayStr}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/10 border border-warning/20 text-warning text-sm font-medium">
            <Flame size={16} /> {progress.streak} Day Streak
          </div>
        </div>
      </div>

      {completed ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center mx-auto mb-4 text-secondary">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl font-bold font-display text-text mb-2">
            Daily Challenge Completed!
          </h2>
          <p className="text-text-muted text-sm max-w-sm mx-auto mb-6">
            You earned +50 XP and maintained your daily streak! Come back tomorrow for the next challenge.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* 1. Daily Core Concept */}
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">1. Daily Concept</Badge>
              <span className="text-xs text-text-subtle">Java 25 LTS</span>
            </div>
            <h3 className="font-semibold text-text text-base mb-1">
              Virtual Threads vs Reactive Programming
            </h3>
            <p className="text-text-muted text-xs leading-relaxed">
              Virtual Threads eliminate the cognitive overhead of reactive callbacks (Flux/Mono) by allowing standard synchronous blocking code to scale horizontally with millions of threads.
            </p>
          </Card>

          {/* 2. Rapid Quiz */}
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">2. Rapid Quiz</Badge>
              <span className="text-xs text-text-subtle">+20 XP</span>
            </div>
            <h3 className="font-medium text-text text-sm mb-3">
              Which garbage collector in modern Java offers concurrent heap management with sub-millisecond pauses?
            </h3>
            <div className="space-y-2 mb-3">
              {['Serial GC', 'Parallel GC', 'ZGC (Z Garbage Collector)', 'CMS GC (Deprecated)'].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedOpt(i);
                    setQuizDone(true);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    selectedOpt === i
                      ? i === 2
                        ? 'border-secondary/60 bg-secondary/15 text-secondary'
                        : 'border-danger/60 bg-danger/15 text-danger'
                      : 'border-border bg-bg-elevated text-text-muted hover:text-text'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {quizDone && (
              <p className={`text-xs ${selectedOpt === 2 ? 'text-secondary' : 'text-danger'}`}>
                {selectedOpt === 2
                  ? '✓ Correct! ZGC achieves sub-millisecond maximum pause times.'
                  : '✗ ZGC is the sub-millisecond scalable low-latency garbage collector.'}
              </p>
            )}
          </Card>

          {/* 3. Code Prediction */}
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">3. Output Prediction</Badge>
              <span className="text-xs text-text-subtle">Java Syntax</span>
            </div>
            <p className="text-xs text-text-muted mb-2 font-medium">Predict the output:</p>
            <pre className="code-block text-xs mb-3">
{`String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");
System.out.print((s1 == s2) + " " + (s1 == s3));`}
            </pre>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? 'Hide Solution' : 'Reveal Solution'}
            </Button>
            {showAnswer && (
              <p className="text-xs font-mono text-secondary mt-2">
                Output: <strong>true false</strong> (s1 and s2 share the String Constant Pool literal; s3 is a distinct heap object).
              </p>
            )}
          </Card>

          {/* Claim Action */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full mt-4"
            icon={<Zap size={18} />}
            onClick={handleClaim}
          >
            Claim Daily Streak (+50 XP)
          </Button>
        </div>
      )}
    </div>
  );
}
