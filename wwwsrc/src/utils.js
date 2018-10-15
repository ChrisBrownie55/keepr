export function traverseUpUntil(condition, node) {
  while (node && !condition(node)) {
    node = node.parentNode
  }
  return node
}