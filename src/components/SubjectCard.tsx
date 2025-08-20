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

function SubjectCard({ title, description, iconName, href }: SubjectCardProps) {
  const IconComponent = iconName ? Icons[iconName] : null;

  return (
    <Link 
      href={href}
      className="group block p-4 sm:p-6 bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#2a2a35] rounded-xl hover:border-[#007AFF] transition-all duration-300 hover:bg-[#1a1a1f]/80 hover:scale-105"
    >
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
        {IconComponent && (
          <div className="p-2 sm:p-3 bg-[#007AFF]/10 rounded-lg group-hover:bg-[#007AFF]/20 transition-colors duration-300">
            <div className="w-6 h-6 sm:w-8 sm:h-8 text-[#007AFF]">
              <IconComponent />
            </div>
          </div>
        )}
        <div className="flex-1 space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#007AFF] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#8B949E] group-hover:text-[#d1d1d1] transition-colors duration-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default memo(SubjectCard);


