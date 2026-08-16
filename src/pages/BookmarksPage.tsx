import React, { useEffect, useState } from 'react';
import { Bookmark, Trash2, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllBookmarks, deleteBookmark } from '@/services/db';
import type { Bookmark as BookmarkType } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBookmarks().then(setBookmarks);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteBookmark(id);
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="text-warning" size={24} />
          <h1 className="text-2xl font-display font-bold text-text">
            Saved Bookmarks
          </h1>
        </div>
        <p className="text-text-muted text-sm">
          Quickly access bookmarked lessons, interview questions, and code snippets saved across your study sessions.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <Card className="text-center py-16">
          <Bookmark size={40} className="text-text-subtle mx-auto mb-3 opacity-40" />
          <h3 className="font-semibold text-text mb-1">No Bookmarks Saved Yet</h3>
          <p className="text-text-muted text-xs max-w-sm mx-auto mb-6">
            Click the bookmark icon inside any lesson or interview card to store it here for rapid revision.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate('/java')}>
            Explore Java Lessons
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookmarks.map(bm => (
            <Card key={bm.id} className="flex items-center justify-between gap-4 p-4 hover:border-border-light transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center text-warning shrink-0">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-text text-sm truncate">{bm.title}</h4>
                  <p className="text-text-subtle text-xs">
                    Type: <span className="uppercase text-[10px]">{bm.type}</span> · Saved: {new Date(bm.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {bm.moduleKey && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ExternalLink size={14} />}
                    onClick={() => navigate(`/${bm.moduleKey}`)}
                  >
                    Open
                  </Button>
                )}
                <button
                  onClick={() => handleDelete(bm.id)}
                  className="p-2 text-text-subtle hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
