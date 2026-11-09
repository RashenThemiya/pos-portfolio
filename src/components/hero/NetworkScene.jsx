import { useEffect, useImperativeHandle, useRef } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function NetworkScene({ onBill, onDispose, sceneRef }) {
  const { t } = useLang();
  const hostRef = useRef(null);
  const controller = useRef(null);
  const inView = useInView(hostRef);
  const reducedMotion = useReducedMotion();
  const latest = useRef(null);
  latest.current = { onBill, onDispose, inView, reducedMotion, labels: t.network };

  useImperativeHandle(sceneRef, () => ({
    getStats: () => controller.current?.getStats() ?? { ready: false },
    getSnapshot: () => controller.current?.getSnapshot?.(),
    renderAt: time => controller.current?.renderAt(time),
    refreshLabels: () => controller.current?.refreshLabels(),
  }), []);

  useEffect(() => {
    let cancelled = false;
    let owned = null;
    const host = hostRef.current;
    import('../../scene/createNetworkScene').then(({ createNetworkScene }) => {
      if (cancelled) return;
      owned = createNetworkScene(host, {
        labels: latest.current.labels,
        active: latest.current.inView,
        reducedMotion: latest.current.reducedMotion,
        onBill: increment => latest.current.onBill?.(increment),
        onDispose: stats => latest.current.onDispose?.(stats),
      });
      controller.current = owned;
    }).catch(() => { if (!cancelled) host.classList.add('nogl'); });
    return () => {
      cancelled = true;
      owned?.dispose();
      owned = null;
      controller.current = null;
    };
  }, []);

  useEffect(() => {
    controller.current?.setActive(inView);
    controller.current?.setReducedMotion(reducedMotion);
    controller.current?.setLabels(t.network);
  }, [inView, reducedMotion, t.network]);

  return <div id="city3d" ref={hostRef} aria-hidden="true" />;
}

