import { useImperativeHandle, useRef } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useStoryAnimation } from '../../hooks/useStoryAnimation';
import { StorySvg } from './StorySvg';

export function StoryCartoon({ animationRef }) {
  const { t } = useLang();
  const svgRef = useRef(null);
  const nodesRef = useRef({});
  const stepsRef = useRef([]);
  const animation = useStoryAnimation(svgRef, nodesRef, stepsRef, t.story.currencyPrefix);
  useImperativeHandle(animationRef, () => animation, [animation.seek, animation.jumpToStep, animation.getTime]);

  function onStepKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      animation.jumpToStep(index);
    }
  }

  return (
    <div className="story">
      <div className="stage-wrap" tabIndex={0} role="region" aria-labelledby="flow-title"><StorySvg svgRef={svgRef} nodesRef={nodesRef} /></div>
      <ol className="steps" id="steps">
        {t.story.steps.map((step, index) => (
          <li key={index} ref={node => { stepsRef.current[index] = node; }} tabIndex={0} data-s={index}
            onClick={() => animation.jumpToStep(index)} onKeyDown={event => onStepKeyDown(event, index)}>
            <i /><b>{step.title}</b><span>{step.description}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

