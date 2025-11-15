// Helper type for API response with list and metaData
export type ApiListResponse<
  T, // item type
  K extends string, // key holding the list
  Extra extends object = Record<string, never>, // optional additional fields
> = ApiResponse<
  {
    [key in K]: T[]
  } & {
    count?: number
    total?: number
    metaData?: MetaData
    errors?: string[]
  } & Extra
>

// Common types for API responses
export type ApiSingleResponse<T, K extends string> = {
  message: string
  data: { [key in K]: T }
}
export interface MetaData {
  page: number
  size: number
  totalPages: number
  totalRecords: number
}

// Generic API response type
export interface ApiResponse<T> {
  message: string
  data: T
}
export type StepStatusType = 'pending' | 'in_progress' | 'completed'

export type StepItemType = {
  step: string
  label: string
  icon: React.ElementType
}

export type StepperProps = {
  steps: StepItemType[]
  currentStep: number
  setStep: (index: number) => void
  isReadOnly?: boolean
}

// API Error Response structure
export interface ApiErrorResponse {
  message: string
  status: number
  timestamp: string
  error?: string
}

// Custom Error type that extends Axios error
export interface CustomError extends Error {
  response?: {
    data: ApiErrorResponse
    status: number
    statusText: string
  }
}

export type StatusSelectType = Exclude<import('./filters.types').StatusType, 'ALL'>

export type MenuStatusSelectType = Exclude<import('./filters.types').MenuStatusType, 'ALL'>

export enum MODES {
  VIEW = 'view',
  EDIT = 'edit',
  NEW = 'new',
}
export enum PAYMENT_TYPES {
  PREPAID = 'PREPAID',
  POSTPAID = 'POSTPAID',
}

export type ModeType = MODES.VIEW | MODES.EDIT | MODES.NEW

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'icon' | 'link'

export interface Translation {
  languageCode: string
  [key: string]: string
}

export interface BaseList {
  id: string
  status: StatusSelectType
  isDeleted: boolean
  createdAt: string
  createdBy: string
  updatedAt: string | null
  updatedBy: string | null
  translations: Translation[]
  displayOrder?: number
}

export interface BaseNamedEntity {
  id: string
  name: string
  translations: Translation[]
}

export enum BulkUploadTypes {
  USERS = 'USERS',
  ITEMS = 'ITEM', // TODO: backend ask: It should be ITEMS/RESTAURANTS at backend
  RESTAURANT = 'RESTAURANT',
}
export enum DISCOUNT_TYPES {
  PERCENT = 'PERCENT',
  FLAT = 'FLAT',
  BXGY = 'BXGY',
}

export type BulkUploadType =
  | BulkUploadTypes.ITEMS
  | BulkUploadTypes.USERS
  | BulkUploadTypes.RESTAURANT

export enum SortTypes {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortType = SortTypes.ASC | SortTypes.DESC

export enum MenuStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum MENU_TABS {
  DETAILS = 'details',
  MENU_ASSIGNMENT = 'menu-assignment',
  PROMOTION = 'promotion',
  DISCOUNT = 'discount',
  PREVIEW_PUBLISH = 'preview & publish',
  ASSIGN_RESTAURANT_GROUP = 'assign-restaurant-group',
  VERSION_HISTORY = 'version history',
}
export enum ORDER_TYPE {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY',
}
export enum TRANSACTION_STATUS {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  CANCELED = 'CANCELED',
}
