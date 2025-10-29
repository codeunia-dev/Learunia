'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TopicGroup {
  topic: TOCItem;
  subtopics: TOCItem[];
}

export default function TableOfContents() {
  const [tocGroups, setTocGroups] = useState<TopicGroup[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [topicOpen, setTopicOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const headings = document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6');
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      tocItems.push({
        id: heading.id || id,
        text,
        level
      });
    });

    // Group by h2 topics and subtopics
    const groups: TopicGroup[] = [];
    let currentTopic: TOCItem | null = null;
    let currentSubtopics: TOCItem[] = [];
    tocItems.forEach(item => {
      if (item.level === 2) {
        if (currentTopic) {
          groups.push({ topic: currentTopic, subtopics: currentSubtopics });
        }
        currentTopic = item;
        currentSubtopics = [];
      } else if (currentTopic) {
        currentSubtopics.push(item);
      }
    });
    if (currentTopic) {
      groups.push({ topic: currentTopic, subtopics: currentSubtopics });
    }

    setTocGroups(groups);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  const handleTopicToggle = (id: string) => {
    setTopicOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="sticky top-4">
      <nav className="space-y-1">
        {tocGroups.length === 0 ? (
          <p className="text-xs text-[#d1d1d1]">No headings found</p>
        ) : (
          tocGroups.map(({ topic, subtopics }) => (
            <div key={topic.id}>
              <button
                className={`block w-full text-xs text-left transition-colors hover:text-white ${
                  activeId === topic.id
                    ? 'text-[#007AFF] font-medium'
                    : 'text-[#d1d1d1]'
                }`}
                style={{ paddingLeft: '0px' }}
                onClick={() => handleTopicToggle(topic.id)}
              >
                {topic.text}
                {subtopics.length > 0 && (
                  <span className="float-right">{topicOpen[topic.id] ? '▲' : '▼'}</span>
                )}
              </button>
              {subtopics.length > 0 && topicOpen[topic.id] && (
                <div className="ml-3">
                  {subtopics.map(sub => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className={`block text-xs transition-colors hover:text-white ${
                        activeId === sub.id
                          ? 'text-[#007AFF] font-medium'
                          : 'text-[#d1d1d1]'
                      }`}
                      style={{ paddingLeft: `${(sub.level - 2) * 12}px` }}
                    >
                      {sub.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>
    </div>
  );
}
