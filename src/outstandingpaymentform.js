'use client'

import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';


// import Image from 'next/image'
// import Link from 'next/link'


export default function OutstandingPaymentrForm() {

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
    //     outPayment: "",

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

        if (!formData.outPayment) result.outPayment = "Please select an option";

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (

        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Outstanding Payment</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor="outPayment">Do you have any outstanding payments with your former institution?</label>


                        <div className='uploadRadioInnerDiv d-flex'>

                            <div className='uploadRadioInnerDiv-1 d-flex'>
                                <input
                                    type="radio"
                                    id="yes"
                                    name="outPayment"
                                    onChange={handleChg}
                                    checked={formData.outPayment === "yes"}
                                    value="yes"
                                    className='radioInput'
                                />
                                <label className='radioBtnLabel' htmlFor="yes">Yes</label>
                            </div>

                            <div className='uploadRadioInnerDiv-1 d-flex'>
                                <input
                                    type="radio"
                                    id="no"
                                    name="outPayment"
                                    onChange={handleChg}
                                    checked={formData.outPayment === "no"}
                                    value="no"
                                    className='radioInput'
                                />
                                <label className='radioBtnLabel' htmlFor="no"> No</label>
                            </div>

                        </div>
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

                        <Link className='links' to={`/inductionPayment`}>
                            <button
                                className="subBtn"
                                type="submit"
                                disabled={!(formData.outPayment || formData.outPayment)}
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
