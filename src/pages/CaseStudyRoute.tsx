import CaseStudy from './CaseStudy';
import CreativeCaseStudy from './CreativeCaseStudy';
import NotFound from './NotFound';
import { softwareBySlug } from '../lib/projects';
import { creativeBySlug } from '../lib/creative';

/** /work/<slug>: a software case study, a creative one (film, reel, identity), or 404. */
export default function CaseStudyRoute({ slug }: { slug: string }) {
  const software = softwareBySlug(slug);
  if (software) return <CaseStudy project={software} />;
  const creative = creativeBySlug(slug);
  if (creative) return <CreativeCaseStudy project={creative} />;
  return <NotFound />;
}
