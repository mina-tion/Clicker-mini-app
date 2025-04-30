export const RequestStatuses = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
} as const;

export type RequestStatus =
  (typeof RequestStatuses)[keyof typeof RequestStatuses];
