import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

import { STORY_DURATION as T, STORY_STAGES as STAGES, STORY_STILLS as STILL } from '../data/story';
import { createStoryRenderer } from '../animation/story/createStoryRenderer';

export function useStoryAnimation(svgRef, nodesRef, stepsRef, currencyPrefix) {
  const inView = useInView(svgRef);
  const reducedMotion = useReducedMotion();
  const timeline = useRef({ time: reducedMotion ? 16.8 : 0 });
  const renderer = useRef(null);
  const playing = useRef(false);
  playing.current = inView && !reducedMotion;

  useLayoutEffect(() => {
    renderer.current = createStoryRenderer(nodesRef.current, stepsRef.current, currencyPrefix);
    renderer.current(timeline.current.time);
    return () => { renderer.current = null; };
  }, [nodesRef, stepsRef, currencyPrefix]);

  useLayoutEffect(() => {
    if (reducedMotion) {
      timeline.current.time = 16.8;
      renderer.current?.(timeline.current.time);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let request;
    let last = null;
    function frame(now) {
      if (!playing.current) return;
      if (last === null) last = now;
      const dt = Math.min(.05, (now - last) / 1000);
      last = now;
      timeline.current.time = (timeline.current.time + dt) % T;
      renderer.current?.(timeline.current.time);
      request = requestAnimationFrame(frame);
    }
    request = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(request);
  }, [inView, reducedMotion]);

  const seek = useCallback(time => {
    if (!Number.isFinite(time)) return;
    timeline.current.time = time >= 0 && time < T ? time : ((time % T) + T) % T;
    renderer.current?.(timeline.current.time);
  }, []);
  const jumpToStep = useCallback(index => {
    seek(reducedMotion ? STILL[index] : STAGES[index] + .01);
  }, [reducedMotion, seek]);
  const getTime = useCallback(() => timeline.current.time, []);

  return { seek, jumpToStep, getTime };
}
