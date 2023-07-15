import { Title } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const cart =
    useSelector((state) => state.carts) || localStorage.getItem("carts");
  const subCategories = useSelector((state) => state.subCategories);
  const priceStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexBasis: "100%",
    margin: "5px",
  };
  const subCategory = subCategories.filter((ele) => cart.includes(ele.id));

  const summaryCost = subCategory.reduce(
    (sum, cartItem) => sum + cartItem.price,
    0
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "20vw",
        flexWrap: "wrap",
        border: "1px solid #eee",
        height: "250px",
        margin: "12px",
      }}
    >
      <Box sx={{ fontSize: "20px" }}>Order Summary</Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={priceStyle}>
          <Box>Summary</Box>
          <Box>
            <span>&#36;</span> {summaryCost}
          </Box>
        </Box>
        <Box sx={priceStyle}>
          <Box>Shipping Charges</Box>
          <Box>
            <span>&#36;</span> 5
          </Box>
        </Box>
        <Box sx={priceStyle}>
          <Box>Tax Estimate</Box>
          <Box>
            <span>&#36;</span>5
          </Box>
        </Box>
        <Box sx={priceStyle}>
          <Box>
            <b>Total Cost</b>
          </Box>
          <Box>
            <b>
              <span>&#36;</span>
              {(summaryCost + 10).toFixed(2)}
            </b>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
