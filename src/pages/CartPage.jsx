import { Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Endpoints from "../api/Endpoints";
import Headers from "../components/Headers";
import OrderSummary from "../components/OrderSummary";
import { ActionTypes } from "../redux/Constants";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart =
    useSelector((state) => state.carts) || localStorage.getItem("carts");
  const wishList =
    useSelector((state) => state.wishList) || localStorage.getItem("wishList");
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
    !cart.length &&
      localStorage.getItem("carts") &&
      dispatch({
        type: ActionTypes.SET_CART,
        payload: {
          data: localStorage.getItem("carts"),
        },
      });
  }, []);

  const subCategory = subCategories.filter((ele) => cart.includes(ele.id));
  console.log(subCategory);

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
      <Box sx={{ width: "100vw" }}>
        <Headers />
        <Divider variant="middle" />
      </Box>
      {subCategory.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexBasis: "100%",
            margin: "5px",
          }}
        >
          <Box sx={{ width: "70vw" }}>
            {subCategory?.map((data) => {
              return (
                <Card
                  key={data.id}
                  sx={{
                    minWidth: "300px",
                    width: "100%",
                    marginBlockEnd: "10px",
                  }}
                  variant="outlined"
                >
                  <Box>
                    <Box
                      className="cardMediaWrapper"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ width: "250px", height: "175px" }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          image={data.image}
                          sx={{
                            objectFit: "fill",
                            width: "100%",
                            height: "100%",
                          }}
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
                              type: ActionTypes.UPDATE_CART,
                              payload: {
                                data: data.id,
                                isDelete: cart.includes(data.id),
                              },
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      marginBottom: "-1px",
                      display: "flex",
                      marginLeft: "30px",
                    }}
                  >
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
                          <span>&#36;</span>
                          {data.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </Box>
          <OrderSummary />
        </Box>
      ) : (
        <Box sx={{ fontSize: "50px", margin: "5px" }}>
          <Box sx={{ color: "red" }}>
            <b>Your Cart is Empty! </b>
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

export default CartPage;
