'use client'

import React from 'react';
import { Link } from "react-router-dom";
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';


// import Image from 'next/image'
// import Link from 'next/link'

export default function NameForm() {

    const { formData, setFormData } = React.useContext(FormContext)
    console.log(formData);

    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };


    // const [formData, setFormData] = React.useState({
    //     name: "",

    // });

    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});
    const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)

    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    function handleChg(e) {
        const { name, value, checked, type } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched((prevState) => {
            return {
                ...prevState,
                [name]: true,
            };
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);

        if (isValid) {
            console.log("submit");
            setStatus(STATUS.COMPLETED);
            setFinished(prev => !prev)
            console.log(formData);
            // dispatch({ type: "setForm", data: formData })
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }


    function getErrors(params) {
        const result = {}

        if (!formData.name) result.name = "Please enter your name";

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (
        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Welcome to the CITN Screening Process</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor="name">Please enter your name to proceed:</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChg}
                            onBlur={handleBlur}
                            value={formData.name}
                        />
                        <p className="error" role="alert">
                            {(touched.name || isStatus === STATUS.SUBMITTED) && errors.name}
                        </p>

                    </div>

                    {/* <br /> */}
                    <Link className='links' to={`/institution`}>
                        <button
                            className="subBtn"
                            type="submit"
                            disabled={!(formData.name || formData.name)}
                        >
                            Next
                        </button>
                    </Link>

                </form>

            </div>
        </AnimatedPage>


    )
}
