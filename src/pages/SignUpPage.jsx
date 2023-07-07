import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const SignUp = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().max(15, "FirstName can have 15 characters only").min(2, "First Name is too short").required('First name is required'),
            lastName: Yup.string().max(20, "LastName can have 15 characters only").min(2, "Last Name is too short").required('Last name is required'),
            email: Yup.string().email("Invalid Email").required('Email is required'),
            password: Yup.string().max(20, "Password can be 20 characters long").required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required('Password is required')
        }),
        onSubmit: (values) => {
            console.log(formik.values)
        },
        validateOnMount: true

    })


    const formData = [
        {
            type: "text",
            className: formik.touched.firstName && formik.errors.firstName ? "form-control is-invalid" : "form-control my-3",
            name: "firstName",
            placeholder: "First Name",
            value: formik.values.firstName,
            errorComponent: formik.touched.firstName && formik.errors.firstName ? <p className="text-danger">{formik.errors.firstName}</p> : null
        },
        {
            type: "text",
            className: formik.touched.lastName && formik.errors.lastName ? "form-control is-invalid" : "form-control my-3",
            name: "lastName",
            placeholder: "Last Name",
            value: formik.values.lastName,
            errorComponent: formik.touched.lastName && formik.errors.lastName ? <p className="text-danger">{formik.errors.lastName}</p> : null
        },
        {
            type: "email",
            className: formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control my-3",
            name: "email",
            placeholder: "Email",
            value: formik.values.email,
            errorComponent: formik.touched.email && formik.errors.email ? <p className="text-danger">{formik.errors.email}</p> : null
        },
        {
            type: "password",
            className: formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control my-3",
            name: "password",
            placeholder: "password",
            value: formik.values.password,
            errorComponent: formik.touched.password && formik.errors.password ? <p className="text-danger">{formik.errors.password}</p> : null
        }
        ,
        {
            type: "password",
            className: formik.touched.confirmPassword && formik.errors.confirmPassword ? "form-control is-invalid" : "form-control my-3",
            name: "confirmPassword",
            placeholder: "password",
            value: formik.values.confirmPassword,
            errorComponent: formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-danger">{formik.errors.confirmPassword}</p> : null
        }
    ]
    let formEle = [];


    for (let i = 0; i < formData.length; i++) {
        let data = <React.Fragment key={i}>
            <input type={formData[i].type} className={formData[i].className}
                name={formData[i].name} placeholder={formData[i].placeholder} value={formData[i].value}
                onChange={formik.handleChange} />
            {
                formData[i].errorComponent
            }
        </React.Fragment >
        formEle.push(data);
    }








    return (

        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <div className="form-group">
                            <form onSubmit={formik.handleSubmit}>
                                <h2> Sign Up </h2>
                                <>{formEle}</>
                                <p className="form-center">
                                    Already Registered ?  <Link to={'/login'}>
                                        Click Here
                                    </Link>
                                </p>

                                {/*  */}

                                <input type="submit" className="btn btn-primary btn-block my-2"
                                    value='Sign Up'
                                    onClick={() => {
                                        console.log(formik.initialValues);
                                        formik.validateForm()
                                            .then((errors) => {
                                                if (Object.keys(errors).length === 0) {
                                                    if (formik.values.email && formik.values.password) {
                                                        localStorage.setItem(
                                                            formik.values.email, formik.values.password
                                                        )
                                                        navigate('/login');
                                                    }

                                                }
                                            }
                                            )
                                    }

                                    }
                                />
                            </form>

                        </div>
                    </div>

                </div>
                <div className="col-md-3">

                </div>


            </div>
        </div >
    )
}

export default SignUp;