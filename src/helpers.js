export default function idToName(id) {
  return id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^[a-z]/, c => c.toUpperCase());
}
