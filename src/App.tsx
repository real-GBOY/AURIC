import { lazy, Suspense } from 'react';
import { basePath } from './lib/i18n';

// One chunk per page: a visitor only downloads the code for the page they open.
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyRoute = lazy(() => import('./pages/CaseStudyRoute'));
const CreativeCaseStudy = lazy(() => import('./pages/CreativeCaseStudy'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
