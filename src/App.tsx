import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import CaseStudies from './pages/CaseStudies';
import NotFound from './components/NotFound';
import CaseStudy from './components/CaseStudy';
import { NOVA_PROJECT, AJWADI_PROJECT, ENACTIX_PROJECT, WEAVOLUTION_PROJECT, BUILD_ART_PROJECT, OPTICARE_PROJECT, ATLAS_PROJECT, MIZAN_PROJECT, HOTEL_OS_PROJECT, CLINIC_OS_PROJECT, RAQIB_PROJECT, ADMIT_PROJECT } from './lib/data';

// Normalise the path: no trailing slash (except the root).
const path = window.location.pathname.replace(/\/+$/, '') || '/';

export default function App() {
  if (path === '/') return <Home />;
  if (path === '/services') return <Services />;
  if (path === '/work') return <Work />;
  if (path === '/case-studies') return <CaseStudies />;
  if (path === '/work/nova') return <CaseStudy project={NOVA_PROJECT} />;
  if (path === '/work/ajwadi') return <CaseStudy project={AJWADI_PROJECT} />;
  if (path === '/work/enactix') return <CaseStudy project={ENACTIX_PROJECT} />;
  if (path === '/work/weavolution') return <CaseStudy project={WEAVOLUTION_PROJECT} />;
  if (path === '/work/build-art') return <CaseStudy project={BUILD_ART_PROJECT} />;
  if (path === '/work/opticare') return <CaseStudy project={OPTICARE_PROJECT} />;
  if (path === '/work/atlas') return <CaseStudy project={ATLAS_PROJECT} />;
  if (path === '/work/mizan') return <CaseStudy project={MIZAN_PROJECT} />;
  if (path === '/work/hotel-os') return <CaseStudy project={HOTEL_OS_PROJECT} />;
  if (path === '/work/clinic-os') return <CaseStudy project={CLINIC_OS_PROJECT} />;
  if (path === '/work/raqib') return <CaseStudy project={RAQIB_PROJECT} />;
  if (path === '/work/admit') return <CaseStudy project={ADMIT_PROJECT} />;
  return <NotFound />;
}
