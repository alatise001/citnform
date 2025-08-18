import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';



// import Image from 'next/image'
// import Link from 'next/link'
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

export default function DropdownForm() {
    const { slug } = useParams();


    const navigate = useNavigate();

    const { formData, setFormData } = React.useContext(FormContext)
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);




    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get(`${process.env.PUBLIC_URL}/data.json`);
                setData(result.data.dropdown);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);



    const filiteredData = data ? data?.filter(item => item?.slug === slug) : [];


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

        if (!formData[slug]) result[slug] = "Please choose a certification";

        return result;
    }

    if (isStatus === "SUBMITTING" || requestStatus === REQUEST_STATUS.LOADING) return (<div className="container">...LOADING</div>)


    return (
        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>{filiteredData[0]?.title}</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor={filiteredData[0]?.name}>{filiteredData[0]?.label}:</label>

                        <select
                            name={filiteredData[0]?.name}
                            id={filiteredData[0]?.name}
                            onChange={handleChg}
                            value={formData[slug]}
                        >

                            {
                                filiteredData[0]?.options.map((option, index) => (
                                    <option key={index} value={option?.name}>
                                        {option?.name}
                                    </option>
                                ))
                            }
                        </select>

                    </div>


                    <div className='btnDiv'>
                        <button
                            className="subBtn"
                            type="button"
                            onClick={() => { navigate(-1) }}
                        // disabled={!(formData.education || formData.education)}
                        >
                            Back
                        </button>



                        <button
                            className="subBtn"
                            type="submit"
                            onClick={() => {
                                if (formData[slug] === ("ACA (ICAN)") || formData[slug] === ("CNA (ANAN)")) {

                                    navigate(`/induction_year`);
                                } else {
                                    if (filiteredData[0]?.id === data?.length - 1) {
                                        navigate('/nysc');
                                    }
                                    else {
                                        navigate(`/certification/${data[0 + 1]?.slug}`);
                                    }
                                }
                            }}
                        // disabled={!(formData.institution)}
                        >
                            Next
                        </button>

                    </div>

                </form>

            </div>
        </AnimatedPage>


    )
}
