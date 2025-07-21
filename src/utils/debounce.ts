/**
 * Creates a debounced version of a function that delays its execution until after
 * the specified wait time has elapsed since the last time it was invoked.
 * 
 * This is useful for limiting the rate at which a function can fire, particularly
 * for expensive operations like API calls, search queries, or DOM updates.
 * 
 * @template T - The type of the function to debounce
 * @param {T} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay execution
 * @returns {(...args: Parameters<T>) => void} A debounced version of the function
 * 
 * @example
 * // Debounce a search function to wait 300ms after user stops typing
 * const handleSearch = (query: string) => {
 *   console.log('Searching for:', query);
 * };
 * const debouncedSearch = debounce(handleSearch, 300);
 * 
 * // This will only execute once, 300ms after the last call
 * debouncedSearch('h');
 * debouncedSearch('he');
 * debouncedSearch('hello'); // Only this will execute
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    // Clear any existing timeout to reset the delay
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to execute the function after the wait period
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}