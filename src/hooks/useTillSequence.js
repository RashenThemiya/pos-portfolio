import { useEffect, useRef, useState } from 'react';
import { tillItems, tillTimings } from '../data/till';

const initialFrame = { count: 0, scanning: false, payment: false, paid: false, cycle: 0 };
const finalFrame = { count: tillItems.length, scanning: false, payment: true, paid: true, cycle: 0 };

export function useTillSequence(active, reducedMotion) {
  const [frame, setFrame] = useState(initialFrame);
  const sequence = useRef({ step: 0, remaining: 0, startedAt: 0, cycle: 0 });

  useEffect(() => {
    if (reducedMotion) {
      sequence.current = { step: 0, remaining: 0, startedAt: 0, cycle: 0 };
      setFrame(initialFrame);
      return;
    }
    if (!active) return;

    let timeout;
    const current = sequence.current;
    function schedule(delay) {
      current.remaining = delay;
      current.startedAt = performance.now();
      timeout = setTimeout(tick, delay);
    }
    function tick() {
      const step = current.step;
      current.step = (step + 1) % (tillItems.length + 3);
      if (step < tillItems.length) {
        if (step === 0) current.cycle += 1;
        setFrame({ count: step + 1, scanning: true, payment: false, paid: false, cycle: current.cycle });
        schedule(tillTimings.item);
      } else if (step === tillItems.length) {
        setFrame(previous => ({ ...previous, scanning: false, payment: true }));
        schedule(tillTimings.payment);
      } else if (step === tillItems.length + 1) {
        setFrame(previous => ({ ...previous, paid: true }));
        schedule(tillTimings.paid);
      } else {
        schedule(tillTimings.restart);
      }
    }

    if (current.remaining > 0) schedule(current.remaining);
    else tick();

    return () => {
      clearTimeout(timeout);
      current.remaining = Math.max(0, current.remaining - (performance.now() - current.startedAt));
    };
  }, [active, reducedMotion]);

  return reducedMotion ? finalFrame : frame;
}
