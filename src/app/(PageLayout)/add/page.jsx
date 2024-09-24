"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { errorAlert, successAlert } from '@/utils/toastify';

// Components
import PageContainer from '@/components/container/PageContainer';
import CustomCard from '@/components/shared/CustomCard';
import Spinner from '@/components/loading/Spinner';
import AddInventoryItemForm from './AddInventoryItemForm';

// Server Actions
import { addItemToInventory } from '@/actions/inventory';

const AddInventoryItemPage = () => {
  const router = useRouter();

  const INITIAL_INVENTORY_ITEM = {
    name: "",
    vendor: "",
    price: "",
    quantity: ""
  };

  const [loading, setLoading] = useState(false);
  const [inventoryItem, setInventoryItem] = useState(INITIAL_INVENTORY_ITEM);

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(inventoryItem);

    if (!inventoryItem.name) return errorAlert("Name is required!");
    if (!inventoryItem.vendor) return errorAlert("Vendor is required!");
    if (!inventoryItem.price) return errorAlert("Price Code is required!");
    if (!inventoryItem.quantity) return errorAlert("Quantity is required!");

    setLoading(true);
    const response = await addItemToInventory(inventoryItem);
    console.log(response);
    setLoading(false);

    if (!response.status) return errorAlert(response.error);

    setInventoryItem(INITIAL_INVENTORY_ITEM);
    successAlert(response.message);
    return router.push('/');
  };

  return (
    <>
      {loading && <Spinner />}

      <PageContainer title="Inventory Management System" description="add new item to inventory page">
        <CustomCard title="Add New Item To Inventory">
          <form method="post" onSubmit={handelSubmit}>
            <AddInventoryItemForm inventoryItem={inventoryItem} setInventoryItem={setInventoryItem} />
          </form>
        </CustomCard>
      </PageContainer>
    </>
  );
};

export default AddInventoryItemPage;