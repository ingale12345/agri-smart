import { DEBOUNCE_DELAY, PAGINATION_CONFIG } from '@agri-smart/types';
import Search from '@agri-smart/shared/components/common/Search';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  flexRender,
} from '@tanstack/react-table';
import { type ColumnDef } from '@agri-smart/shared/components/common/CustomTable/customTable.types';
import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@agri-smart/shared/components/ui/table';
import { Checkbox } from '@agri-smart/shared/components/ui/checkbox';
import Loader from '@agri-smart/shared/components/common/Loader';
import { TablePagination } from './TablePagination';
import { useDebouncedCallback } from '@agri-smart/shared/hooks/useDebouncedCallback';
import { SortTypes } from '@agri-smart/types';
import type { UseCustomTableReturn } from './useCustomTable';
import { ROW_ID_FIELD_NAME } from './customTable.constants';
import { ALIGNMENTS } from './customTable.types';
import { useTranslation } from 'react-i18next';

interface CustomTableProps<TData> extends Partial<UseCustomTableReturn<TData>> {
  // table configs
  tableId: string;
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  noDataMessage?: string;
  errorMessage?: string;
  getColumns: (data: TData[]) => ColumnDef<TData>[];
  onPayloadChange: (payload: Record<string, unknown>) => void;

  // pagination configs
  enablePagination?: boolean;
  total?: number;
  totalPages?: number;

  // search configs
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchClassName?: string;

  // table extensions
  renderFilters?: () => React.ReactNode;
  renderTableActions?: () => React.ReactNode;

  // row id field name for selection
  rowIdFieldName?: keyof TData;

  // colgroup configuration
  cols?: Array<{
    span?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;

  // initial sorting state
  initialSorting?: SortingState;
}

const checkboxClassName =
  'border-[1.5px] bg-secondary data-[state=checked]:border-chart-5 data-[state=checked]:bg-chart-5 data-[state=checked]:text-white';

export const CustomTable = <TData,>({
  data,
  tableId,
  getColumns,
  isLoading = false,
  isError = false,
  noDataMessage,
  errorMessage,
  totalPages = 0,
  total = 0,
  renderFilters,
  enableSearch = false,
  searchPlaceholder,
  enablePagination = true,
  onPayloadChange,
  renderTableActions,
  searchClassName,
  cols,
  initialSorting = [],
  // All selection props automatically available from UseCustomTableReturn
  isRowSelected,
  isRowDisabled,
  toggleRow,
  handleSelectAll,
  isAllSelected = false,
  isPartialSelected = false,
  selectableRowsCount = 0,
  selectedRowsCount = 0,
  enableSelection = false,
  enableSelectAll = true,
  rowIdFieldName = ROW_ID_FIELD_NAME as keyof TData,
  getSelectedCountLabel,
}: CustomTableProps<TData>) => {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [pagination, setPagination] =
    useState<PaginationState>(PAGINATION_CONFIG);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const updateSearch = useDebouncedCallback((val: string) => {
    setDebouncedSearch(val);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, DEBOUNCE_DELAY);
  const handleSearchChange = (e: { target: { value: string } }) => {
    const val = e.target.value || '';
    setSearchQuery(val);
    updateSearch(val.trim());
  };

  const columns: ColumnDef<TData>[] = useMemo(() => {
    const dataColumns = getColumns(data || []);

    // If selection is not enabled, return only data columns
    if (!enableSelection || !isRowSelected || !toggleRow) {
      return dataColumns;
    }

    // Create selection column automatically
    const selectionColumn: ColumnDef<TData> = {
      id: `select-${tableId}`,
      header:
        enableSelectAll && handleSelectAll
          ? () => (
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label={t('select_all_rows')}
                  disabled={selectableRowsCount === 0}
                  className={checkboxClassName}
                />
              </div>
            )
          : () => null,
      cell: ({ row }) => {
        const rowData = row.original;
        const getId = (item: TData) => item[rowIdFieldName] as string | number;
        const rowId = getId(rowData);
        const disabled = isRowDisabled ? isRowDisabled(rowData, rowId) : false;

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={isRowSelected(rowId)}
              onCheckedChange={() => toggleRow(rowData, rowId)}
              aria-label={`${t('select_row')} ${rowId}`}
              disabled={disabled}
              className={checkboxClassName}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
      size: 50,
    };

    // Prepend selection column to data columns
    return [selectionColumn, ...dataColumns];
  }, [
    data,
    getColumns,
    enableSelection,
    enableSelectAll,
    isRowSelected,
    isRowDisabled,
    toggleRow,
    handleSelectAll,
    isAllSelected,
    isPartialSelected,
    selectableRowsCount,
    rowIdFieldName,
    t,
    tableId,
  ]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPagination);
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    state: {
      sorting,
      pagination,
    },
  });

  const params: Record<string, unknown> = useMemo(() => {
    return {
      ...(enablePagination
        ? {
            page: pagination.pageIndex + 1,
            size: pagination.pageSize,
          }
        : {}),
      ...(enableSearch
        ? {
            search: debouncedSearch || undefined,
          }
        : {}),
      ...(sorting.length > 0
        ? {
            sortBy: sorting.map((s) => s.id)?.join(),
            direction: sorting[0].desc ? SortTypes.DESC : SortTypes.ASC,
          }
        : {}),
    };
  }, [
    enablePagination,
    enableSearch,
    pagination.pageIndex,
    pagination.pageSize,
    debouncedSearch,
    sorting,
  ]);

  // callback parent when payload changed
  useEffect(() => {
    if (typeof onPayloadChange === 'function') {
      onPayloadChange(params);
    }
  }, [params, onPayloadChange]);

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive">
          {errorMessage || t('error_loading_table_data')}
        </div>
      </div>
    );
  }

  const renderTable = () => {
    // Check if the last column is an actions column
    const lastColumn = columns[columns.length - 1];
    const isLastColumnActions = lastColumn?.id === 'actions';

    // Create colgroup configuration that accounts for selection column
    const createColgroup = () => {
      if (!cols || cols.length === 0) return null;

      return (
        <colgroup>
          {/* Selection column if enabled */}
          {enableSelection && (
            <col key="selection" span={1} className="w-12 min-w-12 max-w-12" />
          )}
          {/* User-defined columns */}
          {cols.map((col, index) => (
            <col
              key={`col-${index}`}
              span={col.span}
              className={col.className}
              style={col.style}
            />
          ))}
        </colgroup>
      );
    };

    return (
      <Table className="overflow-auto table-fixed">
        {createColgroup()}
        <TableHeader className="sticky top-0 z-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent text-xs"
            >
              {headerGroup.headers.map((header) => {
                const columnDef = header.column.columnDef as ColumnDef<TData>;
                const headerAlignment = columnDef.align || ALIGNMENTS.LEFT;

                return (
                  <TableHead
                    key={header.id}
                    className={`bg-slate-50 ${headerAlignment} ${
                      isLastColumnActions && header.id === 'actions'
                        ? 'sticky right-0 z-1'
                        : ''
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent text-xs text-muted-foreground">
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                <Loader />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const rowData = row.original;
              const getId = (item: TData) =>
                item[rowIdFieldName] as string | number;
              const rowId = getId(rowData);
              const disabled =
                enableSelection && isRowDisabled
                  ? isRowDisabled(rowData, rowId)
                  : false;

              return (
                <TableRow
                  key={row.id}
                  className="hover:bg-transparent text-xs text-muted-foreground"
                >
                  {row.getVisibleCells().map((cell, idx) => {
                    // Check if current cell is the selection column (usually idx === 0)
                    const isSelectionCell = idx === 0 && enableSelection;
                    // Check if current cell is the actions column
                    const isActionsCell =
                      isLastColumnActions && cell.column.id === 'actions';

                    const columnDef = cell.column.columnDef as ColumnDef<TData>;
                    const cellAlignment = columnDef.align || ALIGNMENTS.LEFT;

                    return (
                      <TableCell
                        key={cell.id}
                        className={`${cellAlignment} ${
                          isSelectionCell && disabled
                            ? 'opacity-50 bg-gray-50'
                            : ''
                        } ${
                          isActionsCell ? 'bg-white sticky right-0 z-1' : ''
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow className="hover:bg-transparent text-xs text-muted-foreground">
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <p>{noDataMessage || t('no_data_available')}</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  const renderPagination = () => (
    <TablePagination
      pagination={pagination}
      onPaginationChange={setPagination}
      totalPages={totalPages}
      total={total}
    />
  );

  const renderSelectionSummary = () => {
    if (!enableSelection || selectedRowsCount === 0) return null;
    const message =
      typeof getSelectedCountLabel === 'function'
        ? getSelectedCountLabel()
        : t('rows_selected', { count: selectedRowsCount });

    return (
      <div className="px-3 py-2 text-sm border-b flex items-center justify-between">
        <span className="text-muted-foreground text-xs">{message}</span>
      </div>
    );
  };

  // Check if any top row features are enabled
  const hasFilters = renderFilters && typeof renderFilters === 'function';
  const hasTableActions =
    renderTableActions && typeof renderTableActions === 'function';
  const shouldShowTopRow = hasFilters || enableSearch || hasTableActions;

  return (
    <div className="flex flex-col flex-1 rounded-xl border overflow-auto">
      {shouldShowTopRow && (
        <div className="flex items-center gap-2 border-b p-2 overflow-x-auto no-scrollbar">
          {hasFilters ? renderFilters() : null}
          {enableSearch ? (
            <Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder || t('search')}
              className={searchClassName}
              autoFocus={!!searchQuery}
            />
          ) : null}
          {hasTableActions ? renderTableActions() : null}
        </div>
      )}
      {renderSelectionSummary()}
      {renderTable()}
      {enablePagination ? renderPagination() : null}
    </div>
  );
};

export default CustomTable;
