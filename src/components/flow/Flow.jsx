import { useLang } from '../../i18n/LangContext';
import { Section } from '../shared/Section';
import { StoryCartoon } from './StoryCartoon';

export function Flow({ animationRef }) {
  const { t: { story } } = useLang();
  return (
    <Section id="flow" band title={story.title} description={story.description} titleId="flow-title">
      <StoryCartoon animationRef={animationRef} />
    </Section>
  );
}
