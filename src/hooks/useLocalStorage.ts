import { useState, useEffect } from "react";

/**
 * Custom hook that provides a stateful value synchronized with localStorage.
 * 
 * This hook creates a state variable that persists its value in localStorage
 * and automatically synchronizes across browser tabs. It provides the same
 * API as React's useState hook but with persistence capabilities.
 * 
 * Features:
 * - Automatic serialization/deserialization to/from JSON
 * - Error handling for localStorage access and JSON parsing
 * - Cross-tab synchronization using the storage event
 * - Type-safe with TypeScript generics
 * - Functional updates supported (same as useState)
 * 
 * @param key - The localStorage key to use for storing the value
 * @param initialValue - The initial value to use if no stored value exists
 * 
 * @returns A tuple containing:
 *   - [0]: The current value (same type as initialValue)
 *   - [1]: A setter function that accepts either a value or a function
 * 
 * @example
 * ```tsx
 * // Basic usage with a string
 * const [name, setName] = useLocalStorage('userName', '');
 * 
 * // Usage with an object
 * const [settings, setSettings] = useLocalStorage('appSettings', {
 *   theme: 'dark',
 *   notifications: true
 * });
 * 
 * // Functional updates
 * setSettings(prev => ({ ...prev, theme: 'light' }));
 * ```
 * 
 * @example
 * ```tsx
 * // Usage with arrays
 * const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
 * 
 * const addTodo = (newTodo: Todo) => {
 *   setTodos(prev => [...prev, newTodo]);
 * };
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage or use provided initial value
  // Using lazy initial state with a function to avoid localStorage access on every render
  // This pattern improves performance by only accessing localStorage during initialization
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Attempt to retrieve the stored value from localStorage
      const item = window.localStorage.getItem(key);
      // Parse the JSON if it exists, otherwise use the provided initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Handle any errors (localStorage not available, JSON parsing errors, etc.)
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  // This function mimics the useState setter API, supporting both direct values and functions
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Support functional updates (same API as useState)
      // If the value is a function, call it with the current value
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update React state first (this will trigger a re-render)
      setStoredValue(valueToStore);
      
      // Persist the new value to localStorage
      // JSON.stringify handles serialization for complex types
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle errors like localStorage being full or unavailable
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Listen for changes in other tabs/windows
  // This useEffect sets up cross-tab synchronization using the storage event
  // The storage event fires when localStorage is modified in another tab
  useEffect(() => {
    // Handler function for storage events
    const handleStorageChange = (e: StorageEvent) => {
      // Only respond to changes for our specific key
      // e.newValue will be null if the key was removed, so we check for existence
      if (e.key === key && e.newValue) {
        try {
          // Parse the new value and update our local state
          // This will cause a re-render with the updated value from the other tab
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          // Handle JSON parsing errors from malformed data
          console.error(`Error parsing storage event for ${key}:`, error);
        }
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);
    
    // Cleanup function: remove the event listener when the component unmounts
    // or when the key changes (though key changes are rare in practice)
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]); // Dependency array: re-run effect if the key changes

  // Return the current value and setter function (same API as useState)
  return [storedValue, setValue];
}