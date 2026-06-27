"use client";

import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";

const links = [
  {
    text: "Home",
    navigate: "/",
  },
  {
    text: "Completed",
    navigate: "/completed",
  },
];

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          component={Link}
          href="/"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#fff",
            textTransform: "none",
          }}
        >
          To-Do App
        </Button>
        <Box>
          {links.map((link) => (
            <Button
              key={link.navigate}
              component={Link}
              href={link.navigate}
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#fff",
                textTransform: "none",
              }}
            >
              {link.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
