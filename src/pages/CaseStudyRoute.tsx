import CaseStudy from './CaseStudy';
import NotFound from './NotFound';
import { softwareBySlug } from '../lib/projects';

/** Looks the project up (this is the only route that needs the project data) and shows its case study. */
export default function CaseStudyRoute({ slug }: { slug: string }) {
  const project = softwareBySlug(slug);
  return project ? <CaseStudy project={project} /> : <NotFound />;
}
