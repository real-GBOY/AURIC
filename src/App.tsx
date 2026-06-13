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

// Any path other than "/" is a 404 (Vercel rewrites all paths to this app)
const isRoot = window.location.pathname === '/';

export default function App() {
  if (!isRoot) return <NotFound />;

  return (
    <div className="min-h-screen overflow-x-hidden">
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
