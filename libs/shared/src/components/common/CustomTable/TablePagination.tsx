import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@agri-smart/shared/components/ui/select';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { memo } from 'react';
import { Button } from '@agri-smart/shared/components/ui/button';
import { useTranslation } from 'react-i18next';
import type { TablePaginationProps } from './customTable.types';

export const TablePagination = memo(
  ({
    pagination,
    onPaginationChange,
    totalPages,
    total,
  }: TablePaginationProps) => {
    const { t } = useTranslation();
    const table = useReactTable({
      data: [],
      columns: [],
      getCoreRowModel: getCoreRowModel(),
      onPaginationChange: (updater) => {
        const newPagination =
          typeof updater === 'function' ? updater(pagination) : updater;
        onPaginationChange(newPagination);
      },
      manualPagination: true,
      pageCount: totalPages,
      state: { pagination },
    });

    return (
      <div className="flex items-center gap-4 text-muted-foreground border-t p-2 mt-auto overflow-x-auto no-scrollbar">
        <span className="text-xs mr-auto">
          {t('showing_entries', {
            start: pagination.pageIndex * pagination.pageSize + 1,
            end: Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              total
            ),
            total: total,
          })}
        </span>
        <span className="text-xs">{t('rows_per_page')}</span>
        <Select
          value={pagination.pageSize.toString()}
          onValueChange={(value) => {
            onPaginationChange({
              ...pagination,
              pageSize: Number(value),
              pageIndex: 0,
            });
          }}
        >
          <SelectTrigger className="w-14" size="sm">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-xs">
          {t('page_of', {
            current: pagination.pageIndex + 1,
            total: totalPages,
          })}
        </span>
        <div className="flex items-center gap-0.5">
          <Button
            size="icon"
            className="size-5 border text-muted-foreground"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            <ChevronFirst className="size-3" />
          </Button>
          <Button
            size="icon"
            className="size-5 border text-muted-foreground"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className="size-3" />
          </Button>
          <Button
            size="icon"
            className="size-5 border text-muted-foreground"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight className="size-3" />
          </Button>
          <Button
            size="icon"
            className="size-5 border text-muted-foreground"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(totalPages - 1)}
          >
            <ChevronLast className="size-3" />
          </Button>
        </div>
      </div>
    );
  }
);

TablePagination.displayName = 'TablePagination';
