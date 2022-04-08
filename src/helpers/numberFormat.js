export default function Format(value) {
  return value.toString().split('').reverse()
    .reduce((array, item, index) => (index % 3 === 2 ? [...array, item, ' '] : [...array, item]), [])
    .reverse()
    .join('')
    .trim();
}
