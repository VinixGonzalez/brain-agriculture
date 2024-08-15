"use client";

import React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ProducerType } from "@/schemas/producerSchema";
import { Button } from "@/components";
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import Link from "next/link";

type ProducerTypeColumns = Pick<
  ProducerType,
  "farmName" | "producerName" | "city"
> & { id?: string };

const columnHelper = createColumnHelper<ProducerTypeColumns>();

const columns = [
  columnHelper.accessor("producerName", {
    header: "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("farmName", {
    header: "Fazenda",
  }),
  columnHelper.accessor("city", {
    header: "Cidade",
  }),
];

type ListProducerTableType = {
  list: Array<ProducerType>;
};

export const ListProducerTable: React.FC<ListProducerTableType> = ({
  list,
}) => {
  const [data, _setData] = React.useState(() => list);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
  });

  if (list.length === 0) {
    return (
      <div>
        <p className="text-sm">Não há produtores cadastrados</p>
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-green-50 cursor-pointer">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                >
                  <Link
                    href={`/producers/${row.original.id}`}
                    className="block w-full"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-4" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <HiMiniChevronDoubleLeft />
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <HiMiniChevronLeft />
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <HiMiniChevronRight />
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <HiMiniChevronDoubleRight />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <small>
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount().toLocaleString()}
            </small>
          </div>
        </div>
        <small>
          <strong>{list.length} registros</strong>
        </small>
      </div>
    </div>
  );
};
