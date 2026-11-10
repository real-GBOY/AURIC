import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import CreativeCaseStudy from './pages/CreativeCaseStudy';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { softwareBySlug } from './lib/projects';

// Normalise the path: no trailing slash (except the root).
const path = window.location.pathname.replace(/\/+$/, '') || '/';

export default function App() {
  if (path === '/') return <Home />;
  if (path === '/services') return <Services />;
  if (path === '/work') return <Work />;
  if (path === '/case-studies') return <CaseStudies />;
  if (path === '/case-studies/creative') return <CreativeCaseStudy />;
  if (path === '/team') return <Team />;
  if (path === '/contact') return <Contact />;

  const match = path.match(/^\/work\/([a-z0-9-]+)$/);
  const project = match && softwareBySlug(match[1]);
  if (project) return <CaseStudy project={project} />;

  return <NotFound />;
}
