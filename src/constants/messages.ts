/**
 * Application Messages Constants
 * 
 * This file centralizes all user-facing text messages used throughout
 * the application. This approach provides:
 * - Consistent messaging across components
 * - Easy localization support in the future
 * - Single source of truth for all UI text
 * - Better maintainability and updates
 */

/**
 * Collection of user-facing messages used throughout the application
 * 
 * Each message is carefully crafted to provide clear, actionable information
 * to users in various application states and scenarios.
 */
export const MESSAGES = {
  /**
   * Mobile device warning message
   * 
   * Displayed when the application detects a mobile device or small screen.
   * Informs users that the flow builder is optimized for desktop use due to:
   * - Complex drag-and-drop interactions
   * - Need for larger screen real estate
   * - Mouse-based precision for connecting nodes
   * - Better visibility of the flow canvas
   * 
   * @type {string}
   */
  MOBILE_WARNING: "This application is optimized for desktop use. Please use a desktop browser for the best experience."
};