"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { errorAlert, successAlert } from '@/utils/toastify';
import { fetchData } from '@/utils/clientUtilityFunctions';
import { API_ROUTES } from '@/utils/routes';

// Components
import PageContainer from '@/components/container/PageContainer';
import CustomCard from '@/components/shared/CustomCard';
import Spinner from '@/components/loading/Spinner';
import CustomConfirmDialog from '@/components/shared/CustomConfirmDialog';
import UpdateInventoryItemForm from './UpdateInventoryItemForm';

// Server Actions
import { updateItemInInventory } from '@/actions/inventory';

const UpdateInventoryItemPage = ({ params }) => {
  const router = useRouter();
  const inventoryItemId = params.slug;

  const INITIAL_CONFIRM_DIALOG = {
    isOpen: false,
    title: "",
    subtitle: "",
    description: "",
    onConfirm: () => { },
  };
  const INITIAL_INVENTORY_ITEM = {
    name: "",
    vendor: "",
    price: "",
    quantity: ""
  };

  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(INITIAL_CONFIRM_DIALOG);
  const [inventoryItem, setInventoryItem] = useState(INITIAL_INVENTORY_ITEM);

  const getInventoryItemDetails = async () => {
    setLoading(true);
    const response = await fetchData(`${API_ROUTES.inventory.get}/${inventoryItemId}`);
    console.log(response);
    setLoading(false);

    if (!response.status) return errorAlert(response.error);
    setInventoryItem({ ...inventoryItem, ...response.inventoryItem });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(inventoryItem);

    if (!inventoryItem.name) return errorAlert("Name is required!");
    if (!inventoryItem.vendor) return errorAlert("Vendor is required!");
    if (!inventoryItem.price) return errorAlert("Price Code is required!");
    if (!inventoryItem.quantity) return errorAlert("Quantity is required!");

    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Update Inventory Item",
      subtitle: "Are you sure you want to update this inventory item?",
      description: "You can't undo this operation",
      onConfirm: async () => {
        setLoading(true);
        const response = await updateItemInInventory(inventoryItemId, inventoryItem);
        console.log(response);
        setLoading(false);

        if (!response.status) return errorAlert(response.error);
        successAlert(response.message);
        return router.push('/');
      }
    });
  };

  useEffect(() => {
    getInventoryItemDetails();
  }, []);

  return (
    <>
      {loading && <Spinner />}

      <CustomConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

      <PageContainer title="Inventory Management System" description="update inventory item page">
        <CustomCard title="Update Inventory Item">
          <form method="post" onSubmit={handelSubmit}>
            <UpdateInventoryItemForm inventoryItem={inventoryItem} setInventoryItem={setInventoryItem} />
          </form>
        </CustomCard>
      </PageContainer>
    </>
  );
};

export default UpdateInventoryItemPage;