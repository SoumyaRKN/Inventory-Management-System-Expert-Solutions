import React from 'react';
import moment from 'moment';
import { Typography, Grid, Box } from '@mui/material';

const InventoryItemDetails = ({ inventoryItem }) => {
    const { name, vendor, price, quantity, createdAt, updatedAt } = inventoryItem;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Name:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">{name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Vendor:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">{vendor}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Price:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">₹{price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Quantity:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">{quantity} Nos.</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Created At:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">{moment(new Date(createdAt)).format("Do MMM YYYY hh:mm A")}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} alignContent="center">
                    <Grid container>
                        <Grid item xs={4} alignContent="center">
                            <Typography variant="body1" fontWeight={500}>Updated At:</Typography>
                        </Grid>
                        <Grid item xs={8} alignContent="center">
                            <Typography variant="body1">{moment(new Date(updatedAt)).format("Do MMM YYYY hh:mm A")}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InventoryItemDetails;