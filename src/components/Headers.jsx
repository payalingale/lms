import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { FavoriteBorderTwoTone } from "@mui/icons-material";

const Headers = (props) => {
  const { setValue } = props;
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState("");
  const cart = useSelector((state) => state.carts);
  const wish = useSelector((state) => state.wishList);

  const handleTabs = (e) => {
    setDropDown(e.target.value);
    navigate(`/${e.target.value}`);
  };

  const selectDropDown =
    localStorage.getItem("LoggedInStatus") === "true" ? (
      <Button
        onClick={() => {
          navigate("/login");
          localStorage.removeItem("LoggedInStatus");
        }}
      >
        LogOut
      </Button>
    ) : (
      <FormControl position="static" sx={{ m: 1, minWidth: 200 }} size="medium">
        <InputLabel id="demo-simple-select-label">Login or SignUp</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropDown}
          label="Login/SignUp"
          onChange={handleTabs}
        >
          <MenuItem value={"login"}>SignUp</MenuItem>
          <MenuItem value={"login"}>Login</MenuItem>
        </Select>
      </FormControl>
    );

  const cartIcon = cart.length ? (
    <Box
      sx={{
        borderRadius: "50%",
        backgroundColor: "red",
        color: "white",
        width: "37px",
        height: "21px",
        padding: "6px",
        textAlign: "center",
        top: "7px",
        position: "absolute",
        right: "-10px",
        height: "21px",
      }}
    >
      {cart.length}
    </Box>
  ) : null;

  const wishIcon = wish.length ? <Box>{wish.length}</Box> : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ fontSize: 40 }}
        onClick={() => {
          navigate("/products");
          setValue("products");
        }}
      >
        <span style={{ color: "cyan" }}>SHOP</span>
        <span>LANE</span>
      </Box>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        {selectDropDown}
        <Box>
          {cartIcon}
          <ShoppingCartIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Headers;
