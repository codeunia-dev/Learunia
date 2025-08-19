'use client';

import Link from 'next/link';
import { memo } from 'react';
import * as Icons from './SubjectIcons';

interface SubjectCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  href: string;
}

const SubjectCard = memo(function SubjectCard({ title, description, iconName, href }: SubjectCardProps) {
  const IconComponent = Icons[iconName];
  return (
    <Link 
      href={href} 
      className="block focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 focus:ring-offset-[#0F0F1A] rounded-xl"
      aria-label={`Learn ${title} - ${description}`}
    >
      <div className="group bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl p-6 border border-white/10 card-hover glow-hover h-full">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-[#007AFF] group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
            <IconComponent />
          </div>
          <h3 className="text-xl font-semibold text-white group-hover:text-[#007AFF] transition-colors duration-200">
            {title}
          </h3>
        </div>
        <p className="text-[#D1D1D1] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
});

export default SubjectCard;


