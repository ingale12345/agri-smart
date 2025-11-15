// FIXME: check menu statuses and combine them appropriately to add reusability

export const statuses = [
  { name: 'all', value: 'ALL' },
  { name: 'active', value: 'ACTIVE' },
  { name: 'inactive', value: 'INACTIVE' },
]

export const publish_statuses = [
  { name: 'all', value: 'ALL' },
  { name: 'published', value: 'PUBLISHED' },
  { name: 'unpublished', value: 'UNPUBLISHED' },
]

export const MENU_STATUS = [
  { name: 'all', value: 'ALL' },
  { name: 'draft', value: 'DRAFT' },
  { name: 'published', value: 'PUBLISHED' },
]

export const employeeTypes = [
  { name: 'all', value: 'ALL' },
  { name: 'full_time', value: 'FULL_TIME' },
  { name: 'part_time', value: 'PART_TIME' },
]

export const comboTypes = [
  { name: 'all', value: 'ALL' },
  { name: 'fixed_combo', value: 'FIXED' },
  { name: 'choice_combo', value: 'CHOICE' },
  { name: 'mixed_combo', value: 'MIXED' },
]

export const enum MENU_PUBLISH_STATUS {
  'LIVE' = 'LIVE',
  'SCHEDULED' = 'SCHEDULED',
  'UNSCHEDULED' = 'UNSCHEDULED',
  'PUBLISHED' = 'PUBLISHED',
  'DRAFT' = 'DRAFT',
  'ARCHIVED' = 'ARCHIVED',
}

export const menuPublishedForRestaurantStatuses = [
  { name: 'all', value: 'ALL' },
  { name: 'live', value: MENU_PUBLISH_STATUS.LIVE },
  { name: 'scheduled', value: MENU_PUBLISH_STATUS.SCHEDULED },
  { name: 'unscheduled', value: MENU_PUBLISH_STATUS.UNSCHEDULED },
]

export const STATUS_CONFIGS = {
  [MENU_PUBLISH_STATUS.LIVE]: {
    text: 'live',
    className: 'bg-green-100 text-success',
  },
  [MENU_PUBLISH_STATUS.SCHEDULED]: {
    text: 'scheduled',
    className: 'bg-yellow-100 text-warning',
  },
  [MENU_PUBLISH_STATUS.UNSCHEDULED]: {
    text: 'unscheduled',
    className: 'bg-red-100 text-destructive',
  },
  [MENU_PUBLISH_STATUS.PUBLISHED]: {
    text: 'published',
    className: 'bg-green-100 text-success',
  },
  [MENU_PUBLISH_STATUS.DRAFT]: {
    text: 'draft',
    className: 'bg-yellow-100 text-yellow-700',
  },
  [MENU_PUBLISH_STATUS.ARCHIVED]: {
    text: 'archived',
    className: 'bg-gray-200 text-gray-700',
  },
}
