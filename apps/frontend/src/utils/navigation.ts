import { type NavigateFunction, type NavigateOptions } from 'react-router-dom';

let navigateFn: NavigateFunction | null = null;

/**
 * Store the navigate function globally
 */
export const setNavigate = (navigate: NavigateFunction) => {
  navigateFn = navigate;
};

/**
 * Wrapper to safely navigate outside React components (e.g. from Axios interceptors)
 */
export const navigate = (to: string, options?: NavigateOptions) => {
  if (navigateFn) {
    navigateFn(to, options as NavigateOptions);
  } else {
    return null;
  }
};
