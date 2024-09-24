"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import { errorAlert, successAlert } from '@/utils/toastify';
import { fetchData } from '@/utils/clientUtilityFunctions';
import { API_ROUTES } from '@/utils/routes';

// Components
import PageContainer from '@/components/container/PageContainer';
import CustomCard from '@/components/shared/CustomCard';
import Spinner from '@/components/loading/Spinner';
import CustomConfirmDialog from '@/components/shared/CustomConfirmDialog';
import InventorySearch from './InventorySearch';
import InventoryItemsTable from './InventoryItemsTable';

// Server Actions
import { deleteItemFromInventory } from '@/actions/inventory';

const Action = () => {
  return (
    <Stack display="flex" flexDirection="row">
      <Button component={Link} href="/add">Add New</Button>
    </Stack>
  );
};

const InventoryItemsPage = () => {
  const router = useRouter();

  const INITIAL_CONFIRM_DIALOG = {
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
    onConfirm: () => { },
  };
  const INITIAL_SEARCH_OBJ = { query: "" };

  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(INITIAL_CONFIRM_DIALOG);
  const [search, setSearch] = useState(INITIAL_SEARCH_OBJ);
  const [count, setCount] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);

  const getInventoryItems = async (limit = 10, offset = 0) => {
    const url = `${API_ROUTES.inventory.get}?${Object.keys(search).map(item => `${item}=${search[item]}`).join("&")}&limit=${limit}&offset=${offset}`;

    setLoading(true);
    const response = await fetchData(url);
    console.log(response);
    setLoading(false);

    if (!response.status) return errorAlert(response.error);

    setCount(response.count);
    setInventoryItems(response.inventoryItems);
  };

  const editHandler = async (id) => router.push(`/update/${id}`);

  const deleteItemFromInventoryHandler = async (id) => {
    if (!id) return errorAlert("Item ID is required!");

    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: 'Delete Item From Inventory',
      subtitle: `Are you sure you want to delete this item from the inventory?`,
      description: "You can't undo this operation",
      onConfirm: async () => {
        setLoading(true);
        const response = await deleteItemFromInventory(id);
        console.log(response);
        setLoading(false);

        if (!response.status) return errorAlert(response.error);
        successAlert(response.message);
        getInventoryItems();
      }
    });
  };

  const inventorySearchHandler = async (e) => {
    e.preventDefault();
    console.log(search);
    getInventoryItems();
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  return (
    <>
      {loading && <Spinner />}

      <CustomConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

      <PageContainer title="Inventory Management System" description="this is inventory management page">
        <CustomCard title="Inventory Management" action={<Action />}>

          {/* Search */}
          <Box mb={1}>
            <form method="post" onSubmit={inventorySearchHandler}>
              <InventorySearch search={search} setSearch={setSearch} />
            </form>
          </Box>

          {
            inventoryItems.length > 0 ?
              <InventoryItemsTable
                rows={inventoryItems}
                count={count}
                getInventoryItems={getInventoryItems}
                editHandler={editHandler}
                deleteItemFromInventoryHandler={deleteItemFromInventoryHandler}
              />
              :
              <Stack justifyContent="center" direction="row" alignItems="center" mt={3}>
                {loading ?
                  <Typography>Fetching Data...</Typography>
                  :
                  <Typography
                    component={Link}
                    href="/add"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    No Data Available! Add New.
                  </Typography>
                }
              </Stack>
          }
        </CustomCard>
      </PageContainer>
    </>
  );
};

export default InventoryItemsPage;