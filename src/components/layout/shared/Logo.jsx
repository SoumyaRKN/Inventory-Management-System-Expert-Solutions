import Link from "next/link";
import { styled, Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Typography variant="h5">IMS</Typography>
    </LinkStyled>
  );
};

export default Logo;