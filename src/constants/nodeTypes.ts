export const NODE_TYPES = {
  TEXT_MESSAGE: 'textMessage',
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];