import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const CustomTable = ({ columns, rows, count, getter }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const changePageHandler = (e, newPage) => {
        setPage(parseInt(newPage));

        // 1st Parameter Limit, 2nd Parameter Offset (This is the function must be provided from parent component and must accept limit and offset parameters.)
        getter(rowsPerPage, rowsPerPage * newPage);
    };

    const changeRowsPerPageHandler = (e) => {
        const newRowsPerPage = parseInt(e.target.value);

        setRowsPerPage(newRowsPerPage);
        setPage(0);

        // 1st Parameter Limit, 2nd Parameter Offset (This is the function must be provided from parent component and must accept limit and offset parameters.)
        getter(newRowsPerPage, newRowsPerPage * 0); // Here 0 is the page as the setPage will not set the page immediately
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, textWrap: "wrap", wordWrap: "break-word" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{
                                                    textWrap: "wrap",
                                                    wordWrap: "break-word"
                                                }}>
                                                {column.action ? column.action(row) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={changePageHandler}
                onRowsPerPageChange={changeRowsPerPageHandler}
            />
        </Paper>
    );
};

export default CustomTable;