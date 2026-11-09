export function ScreenPanel({ id, active, children }) {
  return <div className="pane" role="tabpanel" id={'p-' + id} aria-labelledby={'tab-' + id} hidden={!active}>{children}</div>;
}
