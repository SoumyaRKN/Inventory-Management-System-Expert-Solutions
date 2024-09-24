import React, { Fragment } from 'react';
import { Dialog, DialogContent, CircularProgress } from '@mui/material';

const Spinner = () => {
    return (
        <Fragment>
            <Dialog
                open={true}
                hideBackdrop
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }
                }}
            >
                <DialogContent sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default Spinner;