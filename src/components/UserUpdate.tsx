import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { successMsg } from "../services/feedbackService";
import { getUserById, updateUser } from "../services/usersService";
import User from "../interfaces/User";

interface UpdateCardProps {
    userInfo: any;
    onHide: Function;
}
const UpdateCard: FunctionComponent<UpdateCardProps> = ({ userInfo, onHide }) => {

    let { id } = useParams();
    let userId = id ? id : userInfo.userId
    let navigate = useNavigate();
    useEffect(() => {
        getUserById(Number(userId))
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err))
    }, []);

    let [user, setUser] = useState<User>({
        firstName: "", middleName: "", lastName: "", phone: "", email: "", password: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zip: "", role: "user"
    })
    let formik = useFormik({
        initialValues: { firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, phone: user.phone, email: user.email, password: user.password, imageUrl: user.imageUrl, imageAlt: user.imageAlt, state: user.state, country: user.country, city: user.city, street: user.street, houseNumber: user.houseNumber, zip: user.zip, role: user.role },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required("first name length must be at least 2 characters long").min(2),
            middleName: yup.string().min(2),
            lastName: yup.string().required("last name length must be at least 2 characters long").min(2),
            phone: yup.string().required("phone number length must be at least 9 characters long").min(9).max(14),
            email: yup.string().required("please enter a valid email").email(),
            password: yup.string().required("password must be at least 8 characters long").min(8).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%#^*?&]{8,}$/, "Password must contain at least 1 uppercase letter, lowercase letter, digit and special character (@$!%*?&#^)"),
            imageUrl: yup.string().min(2),
            imageAlt: yup.string().min(2),
            state: yup.string().min(2),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required().min(0),
            zip: yup.string().min(5),
        }),
        onSubmit: (values) => {
            updateUser(values, Number(userId))
                .then((res) => {
                    if (id) { navigate(-1) }
                    else { onHide() };
                    successMsg("User updated successfully!")
                })
                .catch((err) => console.log(err))
        }
    })
    return (
        <>
            <div className="container text-center">
                <form className="mb-3" onSubmit={formik.handleSubmit}>
                    <h3 className="display-1">Update User</h3>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="firstName" type="text" className="form-control" id="firstName" placeholder="john"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="firstName">First Name *</label>
                                {formik.touched.firstName && formik.errors.firstName && (<small className="text-danger">{formik.errors.firstName}</small>)}
                            </div></div>
                        <div className="col"><div className="form-floating mb-3">
                            <input name="middleName" type="text" className="form-control" id="middleName" placeholder="snow"
                                value={formik.values.middleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="middleName">Middle Name </label>
                        </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="lastName" type="text" className="form-control" id="lastName" placeholder="Doe"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="lastName">Last Name *</label>
                                {formik.touched.lastName && formik.errors.lastName && (<small className="text-danger">{formik.errors.lastName}</small>)}
                            </div></div>
                        <div className="col"><div className="form-floating mb-3">
                            <input name="phone" type="text" className="form-control" id="phone" placeholder="050-0000000"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="phone">Phone *</label>
                            {formik.touched.phone && formik.errors.phone && (<small className="text-danger">{formik.errors.phone}</small>)}
                        </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="floatingInput">Email Adress *</label>
                                {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}
                            </div></div>
                        <div className="col">
                            <div className="form-floating">
                                <input name="password" type="password" className="form-control" id="password" placeholder="Aa12345678!"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="password">password</label>
                                {formik.touched.password && formik.errors.password && (<small className="text-danger">{formik.errors.password}</small>)}
                            </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="imageUrl" type="string" className="form-control" id="imageUrl" placeholder="https://example.photos/545"
                                    value={formik.values.imageUrl}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="imageUrl">Image Url </label>
                            </div></div>
                        <div className="col"><div className="form-floating mb-3">
                            <input name="imageAlt" type="text" className="form-control" id="imageAlt" placeholder="image"
                                value={formik.values.imageAlt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="imageAlt">Image Alt</label>
                        </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="state" type="text" className="form-control" id="state" placeholder="washington"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="state">State</label>
                            </div></div>
                        <div className="col"><div className="form-floating mb-3">
                            <input name="country" type="text" className="form-control" id="country" placeholder="israel"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="country">Country *</label>
                            {formik.touched.country && formik.errors.country && (<small className="text-danger">{formik.errors.country}</small>)}
                        </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="city" type="text" className="form-control" id="city" placeholder="tel-aviv"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="city">City *</label>
                                {formik.touched.city && formik.errors.city && (<small className="text-danger">{formik.errors.city}</small>)}
                            </div></div>
                        <div className="col"> <div className="form-floating mb-3">
                            <input name="street" type="text" className="form-control" id="street" placeholder="tel-aviv"
                                value={formik.values.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="street">Street *</label>
                            {formik.touched.street && formik.errors.street && (<small className="text-danger">{formik.errors.street}</small>)}
                        </div></div></div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1"
                                    value={formik.values.houseNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="houseNumber">House Number *</label>
                                {formik.touched.houseNumber && formik.errors.houseNumber && (<small className="text-danger">{formik.errors.houseNumber}</small>)}
                            </div></div>
                        <div className="col">  <div className="form-floating mb-3">
                            <input name="zip" type="string" className="form-control" id="zip" placeholder="1"
                                value={formik.values.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="zip">Zip</label>
                        </div></div>
                        <div className="row">
                            <div className="form-check ms-3 text-start fw-bold">
                                <input
                                    className="form-check-input border-warning" type="checkbox" id="roleCheckbox" name="role"
                                    checked={formik.values.role === "business"}
                                    onChange={(e) => {
                                        formik.setFieldValue("role", e.target.checked ? "business" : "user");
                                    }}
                                    onBlur={formik.handleBlur} />
                                <label className="form-check-label " htmlFor="roleCheckbox">
                                    Business client
                                </label>
                                {formik.touched.role && formik.errors.role && (
                                    <p className="text-danger">{formik.errors.role}</p>
                                )}
                            </div></div>
                        <div className="row">
                            <div className="form-check ms-3 text-start fw-bold">
                            </div></div></div>
                    <button
                        type="submit" className="btn btn-success w-50 my-3"
                        disabled={!formik.isValid || !formik.dirty}>Update</button>
                </form >
                <div className="col">
                    <button className="btn backBtn w-25 my-2" onClick={() => {
                        if (id) { navigate(-1) }
                        else { onHide() };
                    }
                    }>Back</button>
                </div></div >        </>
    )
}
export default UpdateCard;