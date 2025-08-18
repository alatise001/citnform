'use client'

import React from 'react';
import { Link } from "react-router-dom";
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
};

const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}


export default function NameForm() {



    const { formData, setFormData } = React.useContext(FormContext)
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});

    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get(`${process.env.PUBLIC_URL}/data.json`);
                setData(result.data.kyc);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    const errors = getErrors();
    const isValid = Object.keys(errors)?.length === 0;

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

    function ValidateEmail(inputText) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }

    function getErrors(params) {
        const result = {}

        data && data.forEach(item => {
            if (!formData[item?.name]) {
                result[item?.name] = item?.alert;
            } else if (item?.name === 'email' && !ValidateEmail(formData[item?.name])) {
                result[item?.name] = "Please enter a valid email address";
            }
        })

        return result;
    }


    if (isStatus === "SUBMITTING" || requestStatus === REQUEST_STATUS.LOADING) return (<div className="container">...LOADING</div>)


    return (
        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Please enter your details</h2>

                <form onSubmit={handleSubmit}>

                    {
                        data.map((item, index) => (

                            <div key={index} className='inputDiv'>
                                <label htmlFor="name">{item?.label}</label>

                                <input
                                    type={item?.type}
                                    name={item?.name}
                                    placeholder={item?.placeholder}
                                    onChange={handleChg}
                                    onBlur={handleBlur}
                                    value={formData[item?.name]}
                                />
                                <p className="error" role="alert">
                                    {(touched[item?.name] || isStatus === STATUS.SUBMITTED) && errors[item?.name]}
                                </p>

                            </div>
                        ))
                    }



                    {/* <br /> */}
                    <Link className='links' to={`/certification/educational_qualification`}>
                        <button
                            className="subBtn"
                            type="submit"
                            disabled={!isValid}
                        >
                            Next
                        </button>
                    </Link>

                </form>

            </div>
        </AnimatedPage>


    )
}
