/**
 * Local Storage Keys Constants
 * 
 * This file defines all localStorage keys used throughout the application
 * for persisting user data and application state. Centralizing these keys:
 * - Prevents key collisions and typos
 * - Makes it easy to change storage keys globally
 * - Provides clear documentation of what data is stored
 * - Enables consistent naming conventions
 * 
 * All keys are prefixed with 'bitespeed-' to avoid conflicts with other
 * applications that might be running on the same domain.
 */

/**
 * localStorage key for the currently active flow
 * 
 * Stores the flow that the user is currently editing in the flow canvas.
 * This enables the application to restore the user's work when they
 * return to the application or refresh the page.
 * 
 * Data structure stored:
 * - nodes: Array of React Flow node objects
 * - edges: Array of React Flow edge objects  
 * - viewport: Current canvas zoom and position state
 * 
 * Key naming pattern: 'bitespeed-current-flow'
 * 
 * @example
 * // Saving current flow:
 * localStorage.setItem(CURRENT_FLOW_KEY, JSON.stringify({
 *   nodes: currentNodes,
 *   edges: currentEdges,
 *   viewport: currentViewport
 * }));
 * 
 * // Loading current flow:
 * const savedFlow = localStorage.getItem(CURRENT_FLOW_KEY);
 * const flowData = savedFlow ? JSON.parse(savedFlow) : null;
 * 
 * @type {string}
 */
export const CURRENT_FLOW_KEY = 'bitespeed-current-flow';

/**
 * localStorage key for the collection of all saved flows
 * 
 * Stores an array of all flows that the user has explicitly saved.
 * This allows users to save multiple flow configurations and switch
 * between them as needed.
 * 
 * Data structure stored: Array of saved flow objects, where each object contains:
 * - id: Unique identifier for the flow
 * - name: User-defined name for the flow
 * - nodes: Array of React Flow node objects
 * - edges: Array of React Flow edge objects
 * - createdAt: Timestamp when flow was created
 * - updatedAt: Timestamp when flow was last modified
 * 
 * Key naming pattern: 'bitespeed-saved-flows'
 * 
 * @example
 * // Saving flows collection:
 * const savedFlows = [
 *   {
 *     id: 'flow-1',
 *     name: 'Welcome Flow',
 *     nodes: [...],
 *     edges: [...],
 *     createdAt: '2024-01-01T00:00:00.000Z',
 *     updatedAt: '2024-01-01T00:00:00.000Z'
 *   }
 * ];
 * localStorage.setItem(SAVED_FLOWS_KEY, JSON.stringify(savedFlows));
 * 
 * // Loading saved flows:
 * const savedFlowsData = localStorage.getItem(SAVED_FLOWS_KEY);
 * const flows = savedFlowsData ? JSON.parse(savedFlowsData) : [];
 * 
 * @type {string}
 */
export const SAVED_FLOWS_KEY = 'bitespeed-saved-flows';