import React from "react";
import moment from "moment";
import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";
import { Fab, Stack } from "@mui/material";

// Components
import CustomTable from "@/components/shared/CustomTable";

const InventoryItemsTable = ({ rows, count, getInventoryItems, editHandler, deleteItemFromInventoryHandler }) => {
  const COLUMNS = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>{row.name}</Link>,
    },
    {
      id: 'vendor',
      label: 'Vendor',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>{row.vendor}</Link>,
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>₹{row.price}</Link>,
    },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>{row.quantity} Nos.</Link>,
    },
    {
      id: 'createdAt',
      label: 'Created At',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>{moment(new Date(row.createdAt)).format("Do MMM YYYY hh:mm A")}</Link>,
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      minWidth: 100,
      align: 'center',
      action: (row) => <Link href={`/${row._id}`}>  {moment(new Date(row.updatedAt)).format("Do MMM YYYY hh:mm A")}</Link>,
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 50,
      align: 'center',
      action: (row) => (
        <Stack flexDirection="row" justifyContent="center">
          <Fab size="small" color="warning" aria-label="edit" sx={{ mr: 0.5 }} onClick={() => editHandler(row._id)}>
            <Edit />
          </Fab>
          <Fab size="small" color="error" aria-label="delete" onClick={() => deleteItemFromInventoryHandler(row._id)}>
            <Delete />
          </Fab>
        </Stack>
      ),
    },
  ];

  return (
    <CustomTable columns={COLUMNS} rows={rows} count={count} getter={getInventoryItems} />
  );
};

export default InventoryItemsTable;