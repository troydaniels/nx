import {
  ArrowRightCircleIcon,
  ArrowTopRightOnSquareIcon,
  DocumentIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {children}
    </div>
  );
}

export function Card({
  description,
  title,
  type = 'documentation',
  url,
}: {
  title: string;
  description: string;
  type: 'documentation' | 'external' | 'video';
  url: string;
}) {
  const iconMap = {
    documentation: <DocumentIcon className="mr-3 h-5 w-5" />,
    external: <ArrowTopRightOnSquareIcon className="mr-3 h-5 w-5" />,
    video: <PlayCircleIcon className="mr-3 h-5 w-5" />,
  };
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi.exec(
      url
    );
  const hasYoutubeId = !!youtubeRegex ? youtubeRegex[1] : '';

  return (
    <div
      key={title}
      className="group relative flex items-center rounded-md border border-slate-200 bg-slate-50/40 pr-8 text-sm shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:bg-slate-50 dark:border-slate-800/40 dark:bg-slate-800/60 dark:hover:bg-slate-800"
    >
      {!!hasYoutubeId && (
        <img
          className="!m-0 aspect-video rounded-md"
          src={`https://img.youtube.com/vi/${hasYoutubeId}/default.jpg`}
        />
      )}
      <div className="flex flex-col p-3 pr-0">
        <a href={url} title={title} className="flex items-center font-semibold">
          <span className="absolute inset-0" aria-hidden="true"></span>
          {!hasYoutubeId ? iconMap[type] : null}
          {title}
        </a>
        {description ? (
          <p className="mt-1.5 w-full text-sm">{description}</p>
        ) : null}

        {/*HOVER ICON*/}
        <span className="absolute right-2 top-1/2 -translate-y-2.5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowRightCircleIcon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
