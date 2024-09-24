import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';

const InventorySearch = ({ search, setSearch }) => {
    const handleChange = (e) => setSearch({ ...search, [e.target.name]: e.target.value });

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={11}>
                    <TextField
                        label="Search"
                        id="query"
                        name="query"
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search by Name, Vendor, Price or Quantity"
                        value={search.query}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} lg={1}>
                    <Button type="submit" variant="contained">Search</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InventorySearch;