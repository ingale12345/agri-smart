import { useState, useCallback } from 'react';

export interface UsePayloadStateProps<T extends object> {
  initialPayload: T;
}

// Allow setPayload to accept Partial<T> OR functional updater
type SetPayload<T> = (update: Partial<T> | ((prev: T) => Partial<T>)) => void;

/**
 * Compares with old payload and update newly sent fields into payload.
 * This is to effective manage CustomTable API payload.
 *
 * @param initialPayload initialPayload
 * @returns [payload, setPayload]
 */
export const usePayloadState = <T extends object>({
  initialPayload = {} as T,
}: UsePayloadStateProps<T>): [T, SetPayload<T>] => {
  const [payload, setPayloadState] = useState<T>(initialPayload);

  const setPayload: SetPayload<T> = useCallback((update) => {
    setPayloadState((prev) => {
      // Determine updated part depending on update type
      const updatedPartial =
        typeof update === 'function' ? update(prev) : update;

      const newPayload = { ...prev, ...updatedPartial };
      // Avoid unnecessary state update
      return JSON.stringify(newPayload) === JSON.stringify(prev)
        ? prev
        : newPayload;
    });
  }, []);

  return [payload, setPayload];
};
