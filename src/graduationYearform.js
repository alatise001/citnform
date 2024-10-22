'use client'

import React from 'react';
import { Link } from "react-router-dom";
import Back from './hooks/back';
import { FormContext } from './contexts/formContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';


// import Image from 'next/image'
// import Link from 'next/link'

export default function GraduationYearForm() {

    const navigate = useNavigate();

    const { formData, setFormData } = React.useContext(FormContext)
    console.log(formData);


    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };


    // const [formData, setFormData] = React.useState({
    //     year: "",

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
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }


    function getErrors(params) {
        const result = {}

        if (!formData.year) result.year = "Please enter a year";

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (

        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Year of Graduation</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor="year">Enter the year you graduated:</label>

                        <input
                            type="number"
                            name="year"
                            min="1900" max="2099" step="1"
                            placeholder="e.g. 2020"
                            onChange={handleChg}
                            onBlur={handleBlur}
                            value={formData.year}
                        />
                        <p className="error" role="alert">
                            {(touched.year || isStatus === STATUS.SUBMITTED) && errors.year}
                        </p>

                    </div>

                    {/* <br /> */}

                    <div className='btnDiv'>
                        <button
                            className="subBtn"
                            type="button"
                            onClick={() => { navigate(-1) }}
                        // disabled={!(formData.institution || formData.institution)}
                        >
                            Back
                        </button>

                        <Link className='links' to={`/outstandingPayment`}>
                            <button
                                className="subBtn"
                                type="submit"
                                disabled={!(formData.year || formData.year)}
                            >
                                Next
                            </button>
                        </Link>
                    </div>

                </form>

            </div>
        </AnimatedPage>


    )
}
