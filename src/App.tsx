import { basePath } from './lib/i18n';

// Pages are bundled with the app, not split into separate files: Googlebot's renderer sometimes fails to
// fetch a page's lazy chunk, which rendered the error screen and made Google treat the page as a soft 404.
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import CaseStudies from './pages/CaseStudies';
import CaseStudyRoute from './pages/CaseStudyRoute';
import CreativeCaseStudy from './pages/CreativeCaseStudy';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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
  return <Page />;
}
