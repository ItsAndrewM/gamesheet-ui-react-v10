/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { GridOptions, GridReadyEvent, ColDef } from "ag-grid-community";
import { themeQuartz } from "@ag-grid-community/theming";
import { useRef } from "react";
import { TableTemplate, useWithTableTheme } from "@/hooks/useWithTableTheme";
import styled from "styled-components";

export interface TableProps {
    data: any[];
    columns: ColDef[];
    onGridReady?: (params: GridReadyEvent) => void;
    onSelectionChanged?: () => void;
    width?: string;
    gridOptions?: GridOptions;
    onSortChanged?: (params: any) => void;
    postSortRows?: (params: any) => void;
    animateRows?: boolean;
    // Theme options
    template?: TableTemplate;
    inverted?: boolean;
    customColors?: {
        hover?: {
            border?: string;
        };
        selected?: {
            bg?: string;
            text?: string;
        };
    };
    // Allow direct theme parameter overrides
    themeParams?: Parameters<typeof themeQuartz.withParams>[0];
}

export function Table({
    data,
    columns,
    onGridReady,
    onSelectionChanged,
    width,
    gridOptions = {},
    template = "liveBlue",
    inverted = false,
    customColors,
    themeParams = {},
    onSortChanged,
    animateRows,
    postSortRows,
}: TableProps) {
    const gridRef = useRef<AgGridReact>(null);

    // Get our theme colors
    const { theme: themeColors } = useWithTableTheme({
        template,
        inverted,
        customColors,
    });

    // Create the theme instance
    const gridTheme = themeQuartz.withParams({
        // ...defaultTableTheme,
        ...themeColors,
        ...themeParams, // Allow direct override of any theme parameters
    });

    const handleGridReady = (params: GridReadyEvent) => {
        onGridReady?.(params);
    };

    const defaultGridOptions: Partial<GridOptions> = {
        rowData: data,
        columnDefs: columns,
        onSortChanged,
        animateRows,
        postSortRows,
        rowSelection: {
            mode: "singleRow",
            isRowSelectable: () => true,
            checkboxes: false,
            enableClickSelection: true,
            copySelectedRows: true,
        },
        suppressCellFocus: true,
        suppressMovableColumns: false,
        onGridReady: handleGridReady,
        onSelectionChanged,
        defaultColDef: {
            sortable: false,
            filter: false,
            resizable: true,
        },
        rowClass: "ag-theme-row-hover",
        getRowClass: () => {
            return "ag-theme-row-hover";
        },
        // Apply theme
        theme: gridTheme,
        domLayout: "autoHeight",
        suppressNoRowsOverlay: true,
    };

    const mergedGridOptions = {
        ...defaultGridOptions,
        ...gridOptions,
    };

    return (
        <TableContainer width={width} className="h-full">
            <AgGridReact ref={gridRef} {...mergedGridOptions} />
        </TableContainer>
    );
}

const TableContainer = styled.div<{ width?: string }>`
    width: ${({ width }) => width || "100%"};

    .ag-root,
    .ag-row {
        font-size: 14px;
    }
`;
