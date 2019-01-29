export function capitalize(s) {
  if (typeof s !== 'string') return s;
  return s && s[0].toUpperCase() + s.slice(1);
}
export function getNextColumnId(columns) {
  if (!columns.length) return 0;
  var id = columns[columns.length - 1].id;
  if (!id) return 0;
  var parts = id.split('_');
  if (!parts[2]) return 0;
  return ++parts[2];
}
export function getNextRowId(rows) {
  if (!rows.length) return 0;
  var id = rows[rows.length - 1].id;
  if (!id) return 0;
  var parts = id.split('_');
  if (!parts[3]) return 0;
  return ++parts[3];
}