import { createElement } from 'react';

function renderPart(part, index) {
  return typeof part === 'string' ? part
    : createElement(part.tag, { key: index }, part.children.map(renderPart));
}

export function Copy({ value }) {
  return Array.isArray(value) ? value.map(renderPart) : value;
}
