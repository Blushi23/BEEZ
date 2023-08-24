import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addCard } from "../services/cardsService";
import { successMsg } from "../services/feedbackService";

interface NewCardProps {
    userInfo: any;
}

const NewCard: FunctionComponent<NewCardProps> = ({ userInfo }) => {
    let navigate = useNavigate();

    let handleToRefresh = () => {
        if (window.confirm("Do you want to clear the form?")) {
            formik.resetForm();
            successMsg("Form is clear")
        }
    }
    useEffect(() => {
        formik.setFieldValue("houseNumber", "");
    }, []);
    let formik = useFormik({
        initialValues: { title: "", subtitle: "", description: "", phone: "", email: "", web: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zip: "", owner: `${userInfo.email}` },
        validationSchema: yup.object({
            title: yup.string().required("Title must be at least 2 characters long").min(2),
            subtitle: yup.string().required("Subtitle must be at least 2 characters long").min(2),
            description: yup.string().required("Description must be at least 2 characters long").min(2),
            phone: yup.string().required("Phone number length must be at least 9 characters long").min(9).max(14),
            email: yup.string().required("Please enter a valid email").email(),
            web: yup.string().min(2),
            imageUrl: yup.string().min(2),
            imageAlt: yup.string().min(2),
            state: yup.string().min(2),
            country: yup.string().required("Country name must be at least 2 characters long").min(2),
            city: yup.string().required("City name must be at least 2 characters long").min(2),
            street: yup.string().required("Street name  must be at least 2 characters long").min(2),
            houseNumber: yup.number().required("Enter a valid house number").min(0),
            zip: yup.string().min(5),
        }),
        onSubmit: (values) => {
            addCard(values)
                .then((res) => {
                    navigate("/")
                    successMsg("Card added successfully!")
                })
                .catch((err) => console.log(err))
        }
    })
    return (<>
        <div className="container text-center">
            <form className="mb-3" onSubmit={formik.handleSubmit}>
                <h3 className="display-1">Add New Card</h3>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="title" type="text" className="form-control" id="title" placeholder="Zoology"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="title">Title *</label>
                            {formik.touched.title && formik.errors.title && (<small className="text-danger">{formik.errors.title}</small>)}
                        </div>
                    </div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="subtitle" type="text" className="form-control" id="subtitle" placeholder="animals store"
                            value={formik.values.subtitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="subtitle">Subtitle *</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (<small className="text-danger">{formik.errors.subtitle}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="description" type="text" className="form-control" id="description" placeholder="bla bla"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="description">Description *</label>
                            {formik.touched.description && formik.errors.description && (<small className="text-danger">{formik.errors.description}</small>)}
                        </div>
                    </div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="phone" type="text" className="form-control" id="phone" placeholder="050-0000000"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="phone">Phone *</label>
                        {formik.touched.phone && formik.errors.phone && (<small className="text-danger">{formik.errors.phone}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="floatingInput">Email Adress *</label>
                            {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <input name="web" type="text" className="form-control" id="web" placeholder="https://www.example.com"
                                value={formik.values.web}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="web">Web</label>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="imageUrl" type="text" className="form-control" id="imageUrl" placeholder="https://example.photos/545"
                                value={formik.values.imageUrl}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="imageUrl">Image Url </label>
                        </div>
                    </div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="imageAlt" type="text" className="form-control" id="imageAlt" placeholder="image"
                            value={formik.values.imageAlt}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="imageAlt">Image Alt</label>
                    </div></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="state" type="text" className="form-control" id="state" placeholder="washington"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="state">State</label>
                        </div>
                    </div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="country" type="text" className="form-control" id="country" placeholder="israel"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="country">Country *</label>
                        {formik.touched.country && formik.errors.country && (<small className="text-danger">{formik.errors.country}</small>)}
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="city" type="text" className="form-control" id="city" placeholder="tel-aviv"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="city">City *</label>
                            {formik.touched.city && formik.errors.city && (<small className="text-danger">{formik.errors.city}</small>)}
                        </div>
                    </div>
                    <div className="col"> <div className="form-floating mb-3">
                        <input name="street" type="text" className="form-control" id="street" placeholder="tel-aviv"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="street">Street *</label>
                        {formik.touched.street && formik.errors.street && (<small className="text-danger">{formik.errors.street}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1"
                                value={formik.values.houseNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="houseNumber">House Number *</label>
                            {formik.touched.houseNumber && formik.errors.houseNumber && (<small className="text-danger">{formik.errors.houseNumber}</small>)}
                        </div>
                    </div>
                    <div className="col">  <div className="form-floating mb-3">
                        <input name="zip" type="number" className="form-control" id="zip" placeholder="1"
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="zip">Zip</label>
                    </div>
                    </div>
                    <div className="row">
                        <div className="form-check ms-3 text-start fw-bold">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn backBtn w-25 my-3" onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <div className="col">
                        <button type="reset" className="btn refreshBtn w-25 my-3" onClick={() => handleToRefresh()}><i className="fa-solid fa-arrows-rotate"></i></button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-warning w-25 my-3"
                    disabled={!formik.isValid || !formik.dirty}>Add Card</button>
            </form >
        </div >
    </>)
}

export default NewCard;