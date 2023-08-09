import { useFormik } from "formik";
import { FormEvent, FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";
import User from "../interfaces/User";

interface LoginProps {
    setUserInfo: Function;
    // onLogin: Function;
    // user: User;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();

    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {

                    if (res.data.length) {
                        navigate("/");
                        successMsg(`You are logged in as ${values.email}`);
                        sessionStorage.setItem("userInfo", JSON.stringify({
                            email: res.data[0].email, role: res.data[0].role,
                            userId: res.data[0].id,
                        }));
                        setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                        // onLogin();
                    }
                    else errorMsg("Wrong email or password");
                })
                .catch((err) => console.log(err));
        },
    })

    return (
        <>
            <div className="container col-md-3 text-center">
                <form className="mb-3" onSubmit={formik.handleSubmit} >
                    <h3 className="display-1">LOGIN</h3>
                    <div className="form-floating mb-3">
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInput">Email Adress</label>
                        {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}

                    </div>
                    <div className="form-floating">
                        <input
                            name="password"
                            type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && (<small className="text-danger">{formik.errors.password}</small>)}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-warning  w-100 my-3"
                        disabled={!formik.isValid || !formik.dirty}>Submit</button>
                </form>
                <Link to="/register" className="register-link">Click to register</Link>
            </div>        </>
    )
}

export default Login;