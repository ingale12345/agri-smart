import { type PaginationState } from '@tanstack/react-table'
import type { ColumnDef as TanstackColumnDef } from '@tanstack/react-table'

export interface TablePaginationProps {
  pagination: PaginationState
  onPaginationChange: (pagination: PaginationState) => void
  totalPages: number
  total: number
}

/**
 * @description Alignment of the column
 * @enum {string}
 * @property {string} LEFT - Left alignment
 * @property {string} RIGHT - Right alignment
 * @property {string} CENTER - Center alignment
 */
export enum ALIGNMENTS {
  LEFT = 'text-left',
  RIGHT = 'text-right',
  CENTER = 'text-center',
}

// Extend ColumnDef with optional align prop
export type ColumnDef<TData> = TanstackColumnDef<TData, unknown> & {
  align?: ALIGNMENTS
}
