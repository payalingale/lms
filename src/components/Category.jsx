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
  Typography,
} from "@mui/material";
import {
  FavoriteBorderTwoTone,
  ShoppingCartTwoTone,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../redux/Constants";

const Category = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts);
  const wishList = useSelector((state) => state.wishList);
  const { category } = useParams();

  const [subCategory, setSubCategory] = useState([]);

  const fetchData = () => {
    axios
      .get(
        category === "products"
          ? Endpoints.PRODUCT_URL
          : Endpoints.SUB_CATEGORY_URL + "/" + category
      )
      .then((response) => {
        setSubCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(subCategory);

  useEffect(() => {
    fetchData();
  }, [category]);

  return subCategory.length ? (
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
      {subCategory.map((data) => {
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
              <Box sx={{ width: "250px", height: "150px" }}>
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
                  disabled={wishList.includes(data.id)}
                  color="secondary"
                  onClick={() => {
                    dispatch({
                      type: ActionTypes.UPDATE_WISHLIST_CART,
                      payload: { data: data.id, isDelete: false },
                    });
                  }}
                >
                  <FavoriteBorderTwoTone />
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
                  <Typography
                    gutterBottom
                    variant="filled"
                    component="div"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    <span>&#8377;</span>
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
                    <ShoppingCartTwoTone />
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
