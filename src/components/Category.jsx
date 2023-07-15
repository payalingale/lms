import Endpoints from "../api/Endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../redux/Constants";

const Category = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts);
  const wishList = useSelector((state) => state.wishList);
  const subCategories = useSelector((state) => state.subCategories);
  const { category } = useParams();

  const fetchData = () => {
    axios
      .get(
        category === "products"
          ? Endpoints.PRODUCT_URL
          : Endpoints.SUB_CATEGORY_URL + "/" + category
      )
      .then((response) => {
        dispatch({
          type: ActionTypes.SET_SUB_CATEGORIES,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(subCategories);

  useEffect(() => {
    fetchData();
  }, [category]);

  return subCategories?.length ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "4px",
        maxWidth: "100vw",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      {subCategories?.map((data) => {
        return (
          <Card
            sx={{
              minWidth: "300px",
              width: 310,
              display: "inline-block",
              marginBlockEnd: "10px",
            }}
            variant="outlined"
          >
            <Box sx={{ display: "flex", alignItems: "center", margin: "4px" }}>
              <Box sx={{ width: "250px", height: "175px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={data.image}
                  sx={{ objectFit: "fill", width: "100%", height: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  height: "150px",
                }}
              >
                <IconButton
                  color="secondary"
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.UPDATE_WISHLIST_CART,
                      payload: {
                        data: data.id,
                        isDelete: wishList.includes(data.id),
                      },
                    });
                  }}
                >
                  {wishList.includes(data.id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ marginBottom: "-1px" }}>
              <CardContent>
                <Box
                  sx={{
                    textAlign: "center",
                    overflow: "hidden",
                    whiteSpace: "noWrap",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="filled"
                    component="div"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {data.title}
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={data.rating.rate}
                    readOnly
                  />
                  <Typography
                    gutterBottom
                    variant="filled"
                    component="div"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    <span>&#36;</span>
                    {data.price}
                  </Typography>
                </Box>
                <Box sx={{ backgroundColor: "#4287f5", margin: "15px" }}>
                  <Button
                    disabled={cart.includes(data.id)}
                    variant="filled"
                    onClick={() => {
                      dispatch({
                        type: ActionTypes.UPDATE_CART,
                        payload: { data: data.id, isDelete: false },
                      });
                    }}
                  >
                    <ShoppingCart />
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Box>
  ) : null;
};

export default Category;
