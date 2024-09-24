import React from "react";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import { Chip, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export default function NavItem({ item, level, pathDirect, hideMenu, onClick }) {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "5px 10px 5px 0",
    borderRadius: `30px`,
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    fontWeight:
      level > 1 && pathDirect === item?.href ? "600 !important" : "400",
    paddingLeft: hideMenu
      ? "0"
      : level > 2
        ? `${level * 15}px`
        : level > 1
          ? "10px"
          : "0",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "-20px",
      height: "100%",
      zIndex: "-1",
      borderRadius: " 0 24px 24px 0",
      transition: "all .3s ease-in-out",
      width: "0",
    },
    "&:hover::before": {
      width: "calc(100% + 20px)",
      backgroundColor: theme.palette.primary.light,
    },
    "& > .MuiListItemIcon-root": {
      width: 45,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      marginRight: "8px",
      transition: "all .3s ease-in-out",
    },
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
      ".MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
      "&:before": {
        backgroundColor: theme.palette.primary.light,
        width: "calc(100% + 16px)",
      },
      "&:hover": {
        color: theme.palette.text.primary,
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href} style={{ textDecoration: "none" }}>
        <ListItemStyled
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={undefined}
          sx={{
            "&:hover": {
              ".MuiListItemIcon-root": {
                color: item.bgcolor + ".main",
              },
            },
            "&:hover::before": {
              backgroundColor: item.bgcolor + ".light",
            },
            "&.Mui-selected": {
              color:
                level > 1
                  ? `${theme.palette.text.secondary} !important`
                  : "primary.main",
              "& .MuiTypography-root": {
                fontWeight: "600 !important",
              },
              ".MuiListItemIcon-root": {
                color: "primary.main",
              },
              "&:before": {
                backgroundColor: "primary.light",
              },
              "&:hover": {
                color: "primary.main",
                ".MuiListItemIcon-root": {
                  color: "primary.main",
                },
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color:
                level > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? "" : <>{`${item?.title}`}</>}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">
                {hideMenu ? "" : item?.subtitle}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
};