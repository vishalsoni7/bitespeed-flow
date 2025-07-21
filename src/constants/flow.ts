/**
 * Flow Configuration Constants
 * 
 * This file contains timing and behavior configuration constants
 * for the flow editor's automatic save functionality.
 */

/**
 * Auto-save delay in milliseconds
 * 
 * Defines how long to wait after the last user interaction before
 * automatically saving the current flow state to localStorage.
 * 
 * - Value: 1000ms (1 second)
 * - Purpose: Prevents excessive save operations while typing/editing
 * - Balance: Short enough for data safety, long enough to avoid performance issues
 * 
 * @example
 * // Used with debouncing to auto-save flow changes
 * const debouncedSave = useMemo(
 *   () => debounce(saveFlow, AUTO_SAVE_DELAY),
 *   []
 * );
 */
export const AUTO_SAVE_DELAY = 1000;