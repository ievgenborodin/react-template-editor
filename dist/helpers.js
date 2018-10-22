export function capitalize(s) {
  if (typeof s !== 'string') return s;
  return s && s[0].toUpperCase() + s.slice(1);
}