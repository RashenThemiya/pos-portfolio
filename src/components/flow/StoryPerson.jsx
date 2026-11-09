export function StoryPerson({ shirt, skin, hair, animated = false, nodeRef, children, ...props }) {
  return (
    <g {...props} ref={nodeRef}>
      <g className="lg" transform={animated ? 'rotate(0 -4 -20)' : undefined}><rect x="-7" y="-20" width="5" height="20" rx="2" fill="#1e2a44" /></g>
      <g className="rg" transform={animated ? 'rotate(0 4 -20)' : undefined}><rect x="2" y="-20" width="5" height="20" rx="2" fill="#1e2a44" /></g>
      <rect x="-10" y="-44" width="20" height="26" rx="7" fill={shirt} />
      <circle cx="0" cy="-52" r="8.5" fill={skin} />
      <path d="M-8.5 -53a8.5 8.5 0 0 1 17 0z" fill={hair} />
      {children}
    </g>
  );
}
