import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Endpoints from "../api/Endpoints";
import Headers from "../components/Headers";
import { ActionTypes } from "../redux/Constants";

const WishListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishList =
    useSelector((state) => state.wishList) || localStorage.getItem("wishList");
  const cart =
    useSelector((state) => state.carts) || localStorage.getItem("cart");
  const subCategories = useSelector((state) => state.subCategories);

  const fetchData = () => {
    axios
      .get(Endpoints.PRODUCT_URL)
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

  useEffect(() => {
    fetchData();
    !wishList.length &&
      localStorage.getItem("wishlist") &&
      dispatch({
        type: ActionTypes.SET_WISHLIST,
        payload: {
          data: localStorage.getItem("wishlist"),
        },
      });
  }, []);

  const subCategory = subCategories.filter((ele) => wishList.includes(ele.id));

  return subCategory ? (
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
      <Box sx={{ width: "100vw", marginBottom: "20px" }}>
        <Headers />
        <Divider variant="middle" />
      </Box>

      {subCategory.length ? (
        subCategory?.map((data) => {
          return (
            <Card
              key={data.id}
              sx={{
                minWidth: "300px",
                width: 310,
                display: "inline-block",
                marginBlockEnd: "10px",
              }}
              variant="outlined"
            >
              <Box
                sx={{ display: "flex", alignItems: "center", margin: "4px" }}
              >
                <Box sx={{ width: "250px", height: "175px" }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={data.image}
                    sx={{ objectFit: "fill", width: "100%", height: "100%" }}
                  />
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
                </CardContent>
              </Box>
            </Card>
          );
        })
      ) : (
        <Box sx={{ fontSize: "50px", margin: "5px" }}>
          <Box sx={{ color: "red" }}>
            <b>No Item in WishList </b>
          </Box>
          <Box
            sx={{
              display: "flex",
              fontSize: "30px",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/products");
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  ) : null;
};

export default WishListPage;
