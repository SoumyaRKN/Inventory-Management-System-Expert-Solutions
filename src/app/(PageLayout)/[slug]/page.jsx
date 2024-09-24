"use client"

import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { errorAlert } from '@/utils/toastify';
import { fetchData } from '@/utils/clientUtilityFunctions';
import { API_ROUTES } from '@/utils/routes';

// Components
import PageContainer from '@/components/container/PageContainer';
import CustomCard from '@/components/shared/CustomCard';
import Spinner from '@/components/loading/Spinner';
import InventoryItemDetails from './InventoryItemDetails';

const InventoryItemDetailsPage = ({ params }) => {
    const inventoryItemId = params.slug;

    const [loading, setLoading] = useState(false);
    const [inventoryItem, setInventoryItem] = useState(null);

    const getInventoryItemDetails = async () => {
        setLoading(true);
        const response = await fetchData(`${API_ROUTES.inventory.get}/${inventoryItemId}`);
        console.log(response);
        setLoading(false);

        if (!response.status) return errorAlert(response.error);
        setInventoryItem(response.inventoryItem);
    };

    useEffect(() => {
        getInventoryItemDetails();
    }, []);

    return (
        <>
            {loading && <Spinner />}

            <PageContainer title="Inventory Management System" description="inventory item details page">
                <CustomCard title={`Inventory Item : ${inventoryItem?.name || ""}`}>
                    {
                        inventoryItem ?
                            <InventoryItemDetails inventoryItem={inventoryItem} />
                            :
                            <Stack justifyContent="center" direction="row" alignItems="center" mt={3}>
                                {loading ? <Typography>Fetching Data...</Typography> : <Typography>No Data Available!</Typography>}
                            </Stack>
                    }
                </CustomCard>
            </PageContainer>
        </>
    );
};

export default InventoryItemDetailsPage;