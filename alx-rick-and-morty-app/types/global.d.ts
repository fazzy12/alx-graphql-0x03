declare module '*.css';

declare module '*.module.css';

// Allow absolute alias imports like '@/styles/globals.css' if TS path mapping is set up.
declare module '@/styles/*';
