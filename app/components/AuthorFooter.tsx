'use client';

import { Github, Globe, Mail } from 'lucide-react';

interface AuthorFooterProps {
  name?: string;
  githubUrl?: string;
  websiteUrl?: string;
  email?: string;
}

export default function AuthorFooter({
  name = 'sjwwhenever (不可兼容)',
  githubUrl = 'https://github.com/sjwwhenever',
  websiteUrl = 'https://sjwwhenever.xyz',
  email = 'sjwwhenever@gmail.com',
}: AuthorFooterProps) {
  return (
    <footer className="bg-black text-white border-t border-gray-700 py-3 px-4">
      <div className="flex items-center justify-center gap-4 text-sm">
        <span className="text-gray-300">Created by {name}</span>
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              title="Website"
            >
              <Globe size={16} />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
