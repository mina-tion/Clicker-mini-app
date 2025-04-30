export const ClaimStatuses = {
  REJECTED: 'Rejected',
  PENDING: 'Pending',
  SUCCESS: 'Success',
  ERROR: 'Error',
} as const;

export type ClaimStatus = (typeof ClaimStatuses)[keyof typeof ClaimStatuses];
