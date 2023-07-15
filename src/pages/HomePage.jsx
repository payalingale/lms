import { Divider, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React from "react";
import Endpoints from "../api/Endpoints";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Headers from "../components/Headers";
import Login from "./LoginPage";
import { ActionTypes } from "../redux/Constants";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [value, setValue] = useState("products");

  //to fetch category list [Jewelry, electronics]
  const fetchData = () => {
    axios
      .get(Endpoints.CATEGORY_URL)
      .then((response) => {
        dispatch({
          type: ActionTypes.SET_CATEGORIES,
          payload: {
            data: response.data,
          },
        });
        navigate("/products");
      })
      .catch((error) => console.log(error));
  };

  const handleTabs = (e, val) => {
    setValue(val);
    navigate(`/${val}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const homePageComponent = (
    <>
      <Headers setValue={setValue} />
      <Divider variant="middle" />
      <Tabs value={value} onChange={handleTabs}>
        <Tab label={"ALL"} value={"products"} />
        {categories?.map((category) => (
          <Tab label={category} value={category} key={category} />
        ))}
      </Tabs>
      <Divider variant="middle" />

      <Outlet />
    </>
  );

  return localStorage.getItem("LoggedInStatus") === "true" ? (
    homePageComponent
  ) : (
    <Login></Login>
  );
};

export default HomePage;
