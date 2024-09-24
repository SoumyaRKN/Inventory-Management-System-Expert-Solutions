import React from "react";
import Link from "next/link";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";

const AuthLogin = ({ title, subtitle, subtext, credentials, setCredentials }) => {
  const handelChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack mt={3}>
        <Box>
          <TextField
            label="Username"
            id="username"
            name="username"
            variant="outlined"
            fullWidth
            required
            value={credentials.username}
            onChange={handelChange}
          />
        </Box>
        <Box mt="25px">
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={credentials.password}
            onChange={handelChange}
          />
        </Box>

        <Stack
          justifyContent="end"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            href="#"
            fontWeight={500}
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthLogin;
