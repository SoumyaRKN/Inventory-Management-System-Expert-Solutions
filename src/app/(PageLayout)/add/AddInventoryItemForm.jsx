import React from 'react';
import { Box, Typography, Button, Grid, TextField } from "@mui/material";

const AddInventoryItemForm = ({ inventoryItem, setInventoryItem }) => {
    const handleChange = (e) => setInventoryItem({ ...inventoryItem, [e.target.name]: e.target.value });

    return (
        <>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Typography fontWeight={600} component="label" htmlFor="name">
                            Name <Typography fontWeight={600} component="label" color="red">*</Typography>
                        </Typography>
                        <TextField
                            id="name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            required
                            placeholder="Enter Name"
                            value={inventoryItem.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography fontWeight={600} component="label" htmlFor="vendor">
                            Vendor <Typography fontWeight={600} component="label" color="red">*</Typography>
                        </Typography>
                        <TextField
                            id="vendor"
                            name="vendor"
                            variant="outlined"
                            fullWidth
                            required
                            placeholder="Enter Vendor Name"
                            value={inventoryItem.vendor}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography fontWeight={600} component="label" htmlFor="price">
                            Price <Typography fontWeight={600} component="label" color="red">*</Typography>
                        </Typography>
                        <TextField
                            id="price"
                            name="price"
                            variant="outlined"
                            fullWidth
                            required
                            placeholder="Enter Price in Numbers"
                            value={inventoryItem.price}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography fontWeight={600} component="label" htmlFor="quantity">
                            Quantity <Typography fontWeight={600} component="label" color="red">*</Typography>
                        </Typography>
                        <TextField
                            id="quantity"
                            name="quantity"
                            variant="outlined"
                            fullWidth
                            required
                            placeholder="Enter Quantity in Numbers"
                            value={inventoryItem.quantity}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box mt={3}>
                <Button type="submit" color="primary" variant="contained" size="large" fullWidth>Save</Button>
            </Box>
        </>
    );
};

export default AddInventoryItemForm;