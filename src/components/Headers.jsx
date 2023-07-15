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
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, FavoriteBorderTwoTone } from "@mui/icons-material";
import { ActionTypes } from "../redux/Constants";

const Headers = (props) => {
  const { setValue } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState("");
  const cart = useSelector((state) => state.carts);
  const wish = useSelector((state) => state.wishList);
  const boxStyle = {
    color: "white",
    position: "absolute",
    top: "7px",
    borderRadius: "50%",
    backgroundColor: "red",
    width: "16px",
    paddingLeft: "4px",
  };

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
          localStorage.removeItem("wishlist");
          localStorage.removeItem("carts");
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

  const cartIcon = cart.length ? <Box sx={boxStyle}>{cart.length}</Box> : null;

  const wishIcon = wish.length ? <Box sx={boxStyle}>{wish.length}</Box> : null;

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
          setValue && setValue("products");
        }}
      >
        <span style={{ color: "cyan" }}>SHOP</span>
        <span>LANE</span>
      </Box>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        {selectDropDown}
        <Box
          sx={{ margin: "5px" }}
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          {wishIcon}
          <Bookmark />
        </Box>
        <Box
          sx={{ margin: "5px" }}
          onClick={() => {
            navigate("/carts");
          }}
        >
          {cartIcon}
          <ShoppingCartIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Headers;
