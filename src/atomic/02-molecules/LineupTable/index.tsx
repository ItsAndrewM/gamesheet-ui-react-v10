/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@/atomic/01-atoms";
import { ColDef } from "ag-grid-community";
import { QueryPreservingLink } from "../BoxscoreLineup/QueryPreservingLink";
import { jerseyNumberSort } from "@/utils/sortJerseyNumber";
import { colors } from "@/constants/Colors/colors";
import styled from "styled-components";
import { useCallback } from "react";

const StyledLineupTable = styled.div`
    .ag-center-cols-viewport {
        min-height: 0 !important;
    }
    .table-header-center {
        min-height: 0;

        .ag-header-cell-label {
            justify-content: center;
        }
    }
    .ag-header-cell {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // Style for sorted columns
    // Table in v9 does not darken the header
    /* .ag-header-cell-sorted-asc,
    .ag-header-cell-sorted-desc {
        background-color: ${colors.light.variations[600]} !important;
    } */

    // I know these arent our colours from colors but colors whites/grays out the table way too much
    // I used the rgba values to mirror the Table from v9 and stats widget
    .sorted-column-even {
        background-color: rgba(54, 56, 61, 0.05) !important;
        transition: background-color 0.3s ease;
    }

    .sorted-column-odd {
        background-color: rgba(54, 56, 61, 0.08) !important;
        transition: background-color 0.3s ease;
    }
`;

type LineupTableProps = {
    columns: ColDef[];
    rows: any[];
};

function LineupTable({ columns, rows }: LineupTableProps) {
    const isEmpty = !rows || rows.length === 0;

    const enhancedColumns = columns.map((col, index) => ({
        ...col,
        cellClass: (params: any) => {
            const columnState = params.api.getColumnState();
            const currentColState = columnState.find(
                (state: any) => state.colId === params.column.getColId() && state.sort !== null
            );
            if (currentColState) {
                return index % 2 === 0 ? "sorted-column-even" : "sorted-column-odd";
            }
            return "";
        },
    }));

    const postSortRows = useCallback((params: any) => {
        requestAnimationFrame(() => {
            if (params.api) {
                params.api.refreshCells({
                    force: true,
                    suppressFlash: true,
                });
            }
        });
    }, []);

    return (
        <StyledLineupTable>
            <Table
                columns={enhancedColumns}
                data={rows}
                postSortRows={postSortRows}
                themeParams={{
                    headerColumnBorder: "#e5e7eb",
                    headerBackgroundColor: colors.light.hex,
                    rowHoverColor: "#f3f4f6",
                    borderColor: "#e5e7eb",
                    oddRowBackgroundColor: colors.ash.hex,
                    headerFontSize: "0.7rem",
                    headerFontWeight: 600,
                    headerTextColor: colors.secondary.hex,
                    columnBorder: false,
                    rowBorder: false,
                    wrapperBorder: false,
                    headerRowBorder: false,
                    rowHeight: isEmpty ? 100 : 30,
                    headerColumnResizeHandleWidth: "0px",
                }}
                template="liveBlue"
            />
        </StyledLineupTable>
    );
}

type PlayerLineupTableProps = {
    sport: string;
    rows: any[];
    height?: string;
};

export function PlayerLineupTable({ sport = "hockey", rows }: PlayerLineupTableProps) {
    console.log(sport);
    const columns: ColDef[] = [
        {
            field: "number",
            headerName: "#",
            comparator: jerseyNumberSort,
            sortable: true,
            initialSort: "asc",
            initialSortIndex: 0,
            sortingOrder: ["asc", "desc"],
            width: 70,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
            },
            // flex: 1,
        },
        {
            field: "title",
            headerName: "PLAYER",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 3,
            cellRenderer: (params: any) => (
                <div className="player-title">
                    <QueryPreservingLink href={`/seasons/[seasonId]/players/${params.data.id}`}>
                        {params.value}
                    </QueryPreservingLink>
                </div>
            ),
        },
        {
            field: "position",
            headerName: "POS.",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        },
        {
            field: "goals",
            headerName: "G",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        },
        {
            field: "assist",
            headerName: "A",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        },
        {
            field: "points",
            headerName: "PTS",
            sortingOrder: ["asc", "desc"],
            sortable: true,
            flex: 1,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        },
        {
            field: "pims",
            headerName: "PIM",
            sortingOrder: ["asc", "desc"],
            sortable: true,
            flex: 1,
            headerClass: "table-header-center",
            cellStyle: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        },
    ];

    // if (!isSoccer) {
    //     columns.push(
    //         {
    //             field: "points",
    //             headerName: "PTS",
    //             sortingOrder: ["asc", "desc"],
    //             sortable: true,
    //             flex: 1,
    //         },
    //         {
    //             field: "pims",
    //             headerName: "PIM",
    //             sortingOrder: ["asc", "desc"],
    //             sortable: true,
    //             flex: 1,
    //         },
    //     );
    // } else {
    //     columns.push(
    //         {
    //             field: "yc",
    //             headerName: "YC",
    //             sortingOrder: ["asc", "desc"],
    //             sortable: true,
    //             flex: 1,
    //         },
    //         {
    //             field: "rc",
    //             headerName: "RC",
    //             sortingOrder: ["asc", "desc"],
    //             sortable: true,
    //             flex: 1,
    //         },
    //     );
    // }
    return <LineupTable columns={columns} rows={rows} />;
}

type GoalieLineupTableProps = {
    rows: any[];
    height?: string;
};

export function GoalieLineupTable({ rows }: GoalieLineupTableProps) {
    const columns: ColDef[] = [
        {
            field: "number",
            headerName: "#",
            comparator: jerseyNumberSort,
            initialSort: "asc",
            initialSortIndex: 0,
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
        },
        {
            field: "title",
            headerName: "GOALIE",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 3,
            cellRenderer: (params: any) => (
                <QueryPreservingLink href={`/seasons/[seasonId]/goalies/${params.data.id}`}>
                    {params.value}
                </QueryPreservingLink>
            ),
        },
        {
            field: "sv",
            headerName: "SV",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
        },
        {
            field: "sa",
            headerName: "SA",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
        },
        {
            field: "ga",
            headerName: "GA",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
        },
        {
            field: "gaa",
            headerName: "GAA",
            sortable: true,
            sortingOrder: ["asc", "desc"],
            flex: 1,
        },
    ];
    return <LineupTable columns={columns} rows={rows} />;
}
