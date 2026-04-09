export function postsWithTag<T extends { tags?: string[] }>(
  items: T[],
  tag: string
): T[] {
  return items.filter((item) => item.tags?.includes(tag) ?? false)
}
