'use client'
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function CheckBoxForm() {

    const navigate = useNavigate();

    const { formData, setFormData } = React.useContext(FormContext)
    const [checkboxstatus, setCheckboxstatus] = React.useState({});
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);

    const [showError, setShowError] = React.useState(false);



    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get(`${process.env.PUBLIC_URL}/data.json`);
                setData(result?.data?.checkbox);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData()
    }, []);

    React.useEffect(() => {
        if (data) {
            const filiteredData = data.reduce((acc, item) => {
                acc[item.name] = "";
                return acc;
            }, {});

            setCheckboxstatus(filiteredData);
        }
    }, [data]);

    React.useEffect(() => {
        const isChecked = Object.values(checkboxstatus).every(value => value === true);
        if (isChecked) {
            setShowError(false);
        } else {
            setShowError(true);
        }
    }, [checkboxstatus]);


    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    function handleChg(e) {
        const { name, value, checked, type } = e.target;

        setCheckboxstatus((prevState) => {
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

            setFormData((prevState) => {
                return {
                    ...prevState,
                    attestation: true,
                };
            })
            axios.post('https://api.sheetbest.com/sheets/97a70188-0305-4c87-88b8-c020e979bf70', formData).then((response) => {

            }).catch((error) => {
                console.error('Error submitting data:', error);
            });
            navigate('/summary');
            setStatus(STATUS.COMPLETED);
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }



    function getErrors(params) {
        const result = {}



        Object.keys(checkboxstatus).forEach((key) => {
            if (!checkboxstatus[key]) {
                result[key] = "This field is required";
            }
        });
        // if (!formData.attestation) {
        //     result.attestation = "Email is required";
        // }

        return result;
    }

    if (isStatus === "SUBMITTING" || requestStatus === REQUEST_STATUS.LOADING) return (<div className="container">...LOADING</div>)


    return (
        <AnimatedPage>


            <div className="form">

                <h2 className='formSubtitle'>Additional Information (Check the following boxes)</h2>

                <form onSubmit={handleSubmit}>

                    {
                        data.map((info, index) => (

                            <div key={index} className='checkboxDiv d-flex'>
                                <input
                                    className='checkbox'
                                    type="checkbox"
                                    id={info?.name}
                                    name={info?.name}
                                    checked={checkboxstatus[info?.name]}
                                    onChange={handleChg}

                                />
                                <label className='checkbox-label' htmlFor="isFriendly" dangerouslySetInnerHTML={{ __html: info?.label }}></label>

                            </div>

                        ))
                    }
                    <p className="error" role="alert">
                        {showError && <p className='checkBoxError'>
                            <b>
                                Please confirm that you understand and will comply with these requirements by checking the boxes above.
                            </b>
                        </p>}
                    </p>


                    <div className='btnDiv'>

                        <button
                            className="subBtn"
                            type="button"
                            onClick={() => { navigate(-1) }}
                        // disabled={!(formData.institution || formData.institution)}
                        >
                            Back
                        </button>

                        {/* <Link className='links' to={`/summary`}> */}
                        <button
                            className="subBtn"
                            type="submit"
                        // onClick={() => showFormError()}y
                        // disabled={isValid}
                        >
                            Next
                        </button>
                        {/* </Link> */}
                    </div>


                </form>

            </div>

        </AnimatedPage>

    );
}
