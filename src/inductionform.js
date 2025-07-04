'use client'

import React from 'react';
import { Link } from "react-router-dom";

import { FormContext } from './contexts/formContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';


// import Image from 'next/image'
// import Link from 'next/link'

export default function InductionForm() {

    const navigate = useNavigate();

    const { formData, setFormData } = React.useContext(FormContext)



    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };

    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});


    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    console.log(isValid);
    console.log(formData.date.length);

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
            setStatus(STATUS.COMPLETED);


        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }


    function getErrors(params) {
        const result = {}

        if (!formData.date) result.date = "Please enter a date";

        return result;
    }




    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (

        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Date of Induction</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor="date">Enter the date you got inducted:</label>

                        <input
                            type="date"
                            name="date"
                            min="1900" max="2099" step="1"
                            placeholder="e.g. 2020"
                            onChange={handleChg}
                            onBlur={handleBlur}
                            value={formData.date}
                        />
                        <p className="error" role="alert">
                            {(touched.date || isStatus === STATUS.SUBMITTED) && errors.date}
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

                        <Link className='links' to={`/nysc`}>
                            <button
                                className="subBtn"
                                type="submit"
                                disabled={!(formData.date)}
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
