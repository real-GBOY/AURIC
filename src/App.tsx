import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import StatsBar from './components/StatsBar';
import CTA from './components/CTA';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Team from './components/Team';
import CaseStudy from './components/CaseStudy';
import AllWork from './components/AllWork';
import { NOVA_PROJECT, AJWADI_PROJECT, ENACTIX_PROJECT, WEAVOLUTION_PROJECT, BUILD_ART_PROJECT, OPTICARE_PROJECT, ATLAS_PROJECT, MIZAN_PROJECT, HOTEL_OS_PROJECT, CLINIC_OS_PROJECT } from './lib/data';

const path = window.location.pathname;

export default function App() {
  if (path === '/team') return <Team />;
  if (path === '/work') return <AllWork />;
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
  if (path !== '/') return <NotFound />;

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <StatsBar />
      <CTA />
      <Footer />
    </div>
  );
}
