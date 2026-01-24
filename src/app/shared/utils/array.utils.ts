export function swapArrayItems<T>(arr: T[], currentIndex: number, newIndex: number): T[] {
  const tempTab = arr[newIndex];
  arr[newIndex] = arr[currentIndex];
  arr[currentIndex] = tempTab;

  return arr;
}
