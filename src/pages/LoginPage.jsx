import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ActionTypes } from "../redux/Constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(formik.values);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required(),
      password: Yup.string().required("Password is mandtory"),
    }),
  });

  const formData = [
    {
      type: "email",
      className:
        formik.touched.email && formik.errors.email
          ? "form-control is-invalid"
          : "form-control my-3",
      name: "email",
      placeholder: "Email",
      value: formik.values.email,
      errorComponent:
        formik.touched.email && formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null,
    },
    {
      type: "password",
      className:
        formik.touched.password && formik.errors.password
          ? "form-control is-invalid"
          : "form-control my-3",
      name: "password",
      placeholder: "password",
      value: formik.values.password,
      errorComponent:
        formik.touched.password && formik.errors.password ? (
          <p className="text-danger">{formik.errors.password}</p>
        ) : null,
    },
  ];

  const formEle = [];

  useEffect(() => {
    dispatch({
      type: ActionTypes.RESET_STORE,
      payload: "",
    });
  }, []);

  for (let i = 0; i < formData.length; i++) {
    const data = (
      <React.Fragment key={i}>
        <input
          type={formData[i].email}
          className={formData[i].className}
          name={formData[i].name}
          placeholder={formData[i].placeholder}
          value={formData[i].value}
          onChange={formik.handleChange}
        />
        {formData[i].errorComponent}
      </React.Fragment>
    );
    formEle.push(data);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div className="form-group">
              <form onSubmit={formik.handleSubmit} noValidate>
                <h2> Login </h2>
                <>{formEle}</>
                {/* <input type="email" className={formik.touched && formik.errors.email ? "form-control is-invalid" : "form-control my-3"} name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                                {formik.touched && formik.errors.email ? <p className="text-danger">{formik.errors.email}</p> : null}
                                <input type="password" className={formik.touched && formik.errors.password ? "form-control is-invalid" : "form-control my-3"} name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                                {formik.touched && formik.errors.password ? <p className="text-danger">{formik.errors.password}</p> : null} */}
                <p className="form-center">
                  New User ? <Link to={"/SignUp"}>Click Here</Link>
                </p>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-secondary  btn-block my-2"
                  onClick={(e) => {
                    formik.validateForm().then(() => {
                      if (formik.values.email && formik.values.password) {
                        const password = localStorage.getItem(
                          formik.values.email
                        );
                        if (password === formik.values.password) {
                          {
                            navigate("/");
                          }
                          console.log("successfully login");
                          localStorage.setItem("LoggedInStatus", "true");
                        } else {
                          localStorage.setItem("LoggedInStatus", "false");
                          console.log("Login Failed");
                        }
                      }
                    });
                  }}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Login;
