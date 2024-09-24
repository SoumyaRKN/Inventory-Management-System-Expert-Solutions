"use client"

import { useState } from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import { errorAlert } from "@/utils/toastify";

// Components
import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/layout/shared/Logo";
import Spinner from "@/components/loading/Spinner";
import AuthLogin from "./AuthLogin";

// Server Actions
import { authenticate } from "@/actions/auth";

const LoginPage = () => {
  const INITIAL_CREDENTIALS = { username: "", password: "" };

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);

    if (!credentials.username) return errorAlert("Username is required");
    if (!credentials.password) return errorAlert("Password is required");

    setLoading(true);
    const response = await authenticate(credentials);
    console.log(response);
    setLoading(false);

    if (response && !response.status) errorAlert(response.error);
  };

  return (
    <>
      {loading && <Spinner />}

      <PageContainer title="Inventory Management System" description="this is Login page">
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ height: "100vh" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>

                <form method="post" onSubmit={handelSubmit}>
                  <AuthLogin
                    subtext={
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        color="textSecondary"
                        mb={1}
                      >
                        Inventory Management System
                      </Typography>
                    }
                    credentials={credentials}
                    setCredentials={setCredentials}
                  />
                </form>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default LoginPage;