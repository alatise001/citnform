'use client'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';
import { useParams } from 'react-router-dom';


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

export default function BooleanForm() {
    const { slug } = useParams();


    const navigate = useNavigate();

    const { formData, setFormData } = React.useContext(FormContext)
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});
    const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)

    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get('/data.json');
                setData(result.data.boolean);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);



    const filiteredData = data ? data.filter(item => item.slug === slug) : [];

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


    async function handleSubmit(e) {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);

        if (isValid) {
            console.log("submit");
            setStatus(STATUS.COMPLETED);
            setFinished(prev => !prev)

        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }




    function getErrors(params) {
        const result = {}

        if (!formData[slug]) result[slug] = "Please select an option";

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING" || requestStatus === REQUEST_STATUS.LOADING) return (<div className="container">...LOADING</div>)


    return (

        <AnimatedPage>

            <div className="form">


                <h2 className='formSubtitle' dangerouslySetInnerHTML={{ __html: filiteredData[0].title }}></h2>
                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor={slug}>Please select "Yes" or "No"</label>


                        <div className='uploadRadioInnerDiv d-flex'>

                            <div className='uploadRadioInnerDiv-1 d-flex'>
                                <input
                                    type="radio"
                                    id="yes"
                                    name={slug}
                                    onChange={handleChg}
                                    checked={formData[slug] === "yes"}
                                    value="yes"
                                    className='radioInput'
                                />
                                <label className='radioBtnLabel' htmlFor="yes">Yes</label>
                            </div>

                            <div className='uploadRadioInnerDiv-1 d-flex'>
                                <input
                                    type="radio"
                                    id="no"
                                    name={slug}
                                    onChange={handleChg}
                                    checked={formData[slug] === "no"}
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
                            onClick={() => { navigate(-1) || navigate(`/${data[0].slug}`) }}
                        // disabled={!(formData.institution || formData.institution)}
                        >
                            Back
                        </button>

                        <button
                            className="subBtn"
                            type="button"
                            onClick={() => {
                                if (filiteredData[0].id === data.length - 1) {
                                    navigate('/attestation');
                                } else {
                                    navigate(`/${data[0 + 1].slug}`);
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>

                </form>

            </div>
        </AnimatedPage>


    )
}
