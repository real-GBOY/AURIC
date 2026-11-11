import { lazy, Suspense } from 'react';
import { basePath } from './lib/i18n';

// One chunk per page: a visitor only downloads the code for the page they open.
// A failed download (flaky network, crawler resource limits) is retried before the error screen shows.
const load = <T,>(f: () => Promise<T>, tries = 3): Promise<T> =>
  f().catch((err) => (tries > 1 ? new Promise((r) => setTimeout(r, 700)).then(() => load(f, tries - 1)) : Promise.reject(err)));
const Home = lazy(() => load(() => import('./pages/Home')));
const Services = lazy(() => load(() => import('./pages/Services')));
const Work = lazy(() => load(() => import('./pages/Work')));
const CaseStudies = lazy(() => load(() => import('./pages/CaseStudies')));
const CaseStudyRoute = lazy(() => load(() => import('./pages/CaseStudyRoute')));
const CreativeCaseStudy = lazy(() => load(() => import('./pages/CreativeCaseStudy')));
const Team = lazy(() => load(() => import('./pages/Team')));
const Contact = lazy(() => load(() => import('./pages/Contact')));
const NotFound = lazy(() => load(() => import('./pages/NotFound')));

// Same routes in both languages: /ar/... renders the page in Arabic.
const path = basePath;

function Page() {
  if (path === '/') return <Home />;
  if (path === '/services') return <Services />;
  if (path === '/work') return <Work />;
  if (path === '/case-studies') return <CaseStudies />;
  if (path === '/case-studies/creative') return <CreativeCaseStudy />;
  if (path === '/team') return <Team />;
  if (path === '/contact') return <Contact />;

  const match = path.match(/^\/work\/([a-z0-9-]+)$/);
  if (match) return <CaseStudyRoute slug={match[1]} />;

  return <NotFound />;
}

export default function App() {
  // The page background is already dark, so an empty fallback doesn't flash while a chunk loads.
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
