import { useState, useCallback, useMemo } from 'react'
import { ROW_ID_FIELD_NAME } from './customTable.constants'

export interface UseCustomTableProps<T> {
  /**
   * current page data
   */
  data: T[]
  /**
   * unique identifier key in data objects (default: 'id')
   */
  rowIdFieldName?: keyof T
  /**
   * enable row selection feature (default: true)
   */
  enableSelection?: boolean
  /**
   * enable "select all" checkbox in header (default: true)
   */
  enableSelectAll?: boolean
  /**
   * initial selected row IDs (default: empty array)
   */
  initialSelectedRowIds?: Array<string | number>
  /**
   * IDs of rows that should be disabled for selection (default: empty array)
   */
  disabledRowIds?: Array<string | number>
  /**
   * Condition to disable row selection
   * @param row - current row data
   * @returns true if the row should be disabled, false otherwise
   */
  disableRowCondition?: (row: T) => boolean
  /**
   * allow multiple row selection (default: true). If false, only single row can be selected at a time.
   */
  multipleSelection?: boolean
  /**
   * Name of the entity for selection label (e.g., 'restaurant')
   */
  entityName: string
}

export interface UseCustomTableReturn<T = unknown> {
  selectedRowIds: Array<string | number>
  isRowSelected: (id: string | number) => boolean
  isRowDisabled: (row: T, id: string | number) => boolean
  toggleRow: (row: T, id: string | number) => void
  selectAll: () => void
  deselectAll: () => void
  setSelectedRowIds: (ids: Array<string | number>) => void
  handleSelectAll: () => void
  isAllSelected: boolean
  isPartialSelected: boolean
  selectableRowsCount: number
  selectedRowsCount: number
  enableSelection: boolean
  enableSelectAll: boolean
  multipleSelection: boolean
  /**
   * Returns a label like '2 restaurants selected' or '1 restaurant selected'
   */
  getSelectedCountLabel: () => string
}

export function useCustomTable<T = unknown>({
  data,
  rowIdFieldName,
  enableSelection = true,
  enableSelectAll = true,
  initialSelectedRowIds = [],
  disabledRowIds = [],
  disableRowCondition,
  multipleSelection = true,
  entityName,
}: UseCustomTableProps<T>): UseCustomTableReturn<T> {
  const key = rowIdFieldName || (ROW_ID_FIELD_NAME as keyof T)
  const getId = useCallback((row: T) => row[key] as string | number, [key])

  const [selectedRowIds, setSelectedRowIds] =
    useState<Array<string | number>>(initialSelectedRowIds)

  // Get all row IDs from current page data
  const allRowIds = useMemo(() => data?.map(getId) || [], [data, getId])

  // Determine which rows are disabled
  const isRowDisabled = useCallback(
    (row: T, id: string | number) => {
      // Check if explicitly disabled
      if (disabledRowIds.includes(id)) return true

      // Check condition-based disabling
      if (typeof disableRowCondition === 'function' && disableRowCondition(row)) return true

      return false
    },
    [disabledRowIds, disableRowCondition]
  )

  // Get selectable (non-disabled) row IDs from current page
  const selectableRowIds = useMemo(() => {
    return allRowIds.filter((id) => {
      const row = data?.find((r) => getId(r) === id)
      return row ? !isRowDisabled(row, id) : false
    })
  }, [allRowIds, data, getId, isRowDisabled])

  // Count metrics
  const selectableRowsCount = selectableRowIds.length
  const selectedRowsCount = selectedRowIds.length

  // Check if row is selected
  const isRowSelected = useCallback(
    (id: string | number) => {
      return selectedRowIds.includes(id)
    },
    [selectedRowIds]
  )

  // Check if all selectable rows are selected
  const isAllSelected = useMemo(() => {
    return selectableRowsCount > 0 && selectableRowIds.every((id) => selectedRowIds.includes(id))
  }, [selectableRowIds, selectedRowIds, selectableRowsCount])

  // Check if some but not all rows are selected
  const isPartialSelected = useMemo(() => {
    const selectedSelectableRows = selectedRowIds.filter((id) => selectableRowIds.includes(id))
    return selectedSelectableRows.length > 0 && selectedSelectableRows.length < selectableRowsCount
  }, [selectedRowIds, selectableRowIds, selectableRowsCount])

  // Toggle individual row selection
  const toggleRow = useCallback(
    (row: T, id: string | number) => {
      // Don't toggle if row is disabled
      if (isRowDisabled(row, id)) return

      setSelectedRowIds((prev) => {
        if (multipleSelection) {
          // Multiple selection mode
          if (prev.includes(id)) {
            return prev.filter((rowId) => rowId !== id)
          } else {
            return [...prev, id]
          }
        } else {
          // Single selection mode
          if (prev.includes(id)) {
            return [] // Deselect if already selected
          } else {
            return [id] // Replace selection with current row
          }
        }
      })
    },
    [isRowDisabled, multipleSelection]
  )

  // Select all selectable rows on current page
  const selectAll = useCallback(() => {
    setSelectedRowIds((prev) => {
      // Add all selectable rows from current page to existing selections
      const newSelections = [...new Set([...prev, ...selectableRowIds])]
      return newSelections
    })
  }, [selectableRowIds])

  // Deselect all rows
  const deselectAll = useCallback(() => {
    if (multipleSelection) {
      // In multiple selection, keep selections from other pages
      setSelectedRowIds((prev) => prev.filter((id) => !allRowIds.includes(id)))
    } else {
      // In single selection, clear all
      setSelectedRowIds([])
    }
  }, [multipleSelection, allRowIds])

  // Handle select all checkbox toggle
  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      deselectAll()
    } else {
      selectAll()
    }
  }, [isAllSelected, deselectAll, selectAll])

  // Returns a label like '2 restaurants selected' or '1 restaurant selected'
  const getSelectedCountLabel = useCallback(() => {
    const plural = selectedRowsCount === 1 ? entityName : `${entityName}s`
    return `${selectedRowsCount} ${plural} selected`
  }, [selectedRowsCount, entityName])

  // Return all props at same level - consumer can destructure what they need
  return {
    selectedRowIds,
    isRowSelected,
    isRowDisabled,
    toggleRow,
    selectAll,
    deselectAll,
    setSelectedRowIds,
    handleSelectAll,
    isAllSelected,
    isPartialSelected,
    selectableRowsCount,
    selectedRowsCount,
    enableSelection,
    enableSelectAll,
    multipleSelection,
    getSelectedCountLabel,
  }
}
