export const DEBOUNCE_DELAY = 500

/**
 * Pagination handling notes:
 * - pageIndex should be 0-based for tanstack/react-table and frontend components
 * - When sending to API, use (pageIndex + 1) as backend pagination starts at 1
 */
export const PAGINATION_CONFIG = {
  pageIndex: 0,
  pageSize: 10,
}

// Maximum size for dropdown queries to fetch all items
export const DROPDOWN_MAX_SIZE = 1000000
export enum UNSAVED_CHANGES_ON_BUTTON {
  LOGOUT = 'LOGOUT',
}
// allowed number of digits for input used for basePrice
export const BASE_PRICE = {
  BEFORE: 5,
  AFTER: 2,
}

export const ALL_OPTION = {
  label: 'all',
  value: '*',
}

export const NOT_APPLICABLE = 'na'

// Status values for entities (ACTIVE/INACTIVE)
export const STATUS_VALUES = ['ACTIVE', 'INACTIVE'] as const

// Combo configuration
export const MAX_COMBO_ITEMS = 5
export const MIN_COMBO_CHOICE_SELECT = 2

// Category display order constants
export const DEFAULT_CATEGORY_ORDER = 0

// App type constants
export enum APP_TYPE {
  HQ_ADMIN = 'HQ_ADMIN',
  HQADMIN = 'HQADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
  CASHIER = 'CASHIER',
  KDS = 'KDS',
  CUSTOMER = 'CUSTOMER',
}
// Device type constants
export enum DEVICE_TYPE {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}
export enum CUSTOM_CATEGORY_TYPES {
  ALL = 'ALL',
  COMBOS = 'COMBOS',
}
export const CUSTOM_CATEGORY_VALUES = {
  [CUSTOM_CATEGORY_TYPES.ALL]: ALL_OPTION.value,
  [CUSTOM_CATEGORY_TYPES.COMBOS]: 'combos',
}
// Price override type constants
export enum OVERRIDE_TYPE {
  AMOUNT_DECREMENT = 'AMOUNT_DECREMENT',
  AMOUNT_INCREMENT = 'AMOUNT_INCREMENT',
  PERCENTAGE_DECREMENT = 'PERCENTAGE_DECREMENT',
  PERCENTAGE_INCREMENT = 'PERCENTAGE_INCREMENT',
}

// Price override level constants
export enum OVERRIDE_LEVEL {
  MENU = 'MENU',
  CATEGORY = 'CATEGORY',
}
