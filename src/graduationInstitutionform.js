import React from 'react';
import { Link } from "react-router-dom";
import Back from './hooks/back';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';



// import Image from 'next/image'
// import Link from 'next/link'

export default function GraduationForm() {

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
    //     institution: "",

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

        if (!formData.institution) result.institution = "Please enter your name";

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (
        <AnimatedPage>

            <div className="form">

                <h2 className='formSubtitle'>Select Your Graduated Institution</h2>

                <form onSubmit={handleSubmit}>

                    <div className='inputDiv'>
                        <label htmlFor="institution">Choose institution:</label>

                        <select
                            name="institution"
                            id="institution"
                            onChange={handleChg}
                            onBlur={handleBlur}
                            value={formData.institution}
                        >
                            <option value="None">None</option>
                            <option value="ICAN">ICAN</option>
                            <option value="CITN Tax Academy">CITN Tax Academy</option>
                            <option value="CITN Tax Academy">FIRS JTB (Joint Tax Board)</option>
                        </select>

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
                        <Link className='links' to={`/gradutionYear`}>
                            <button
                                className="subBtn"
                                type="submit"
                            // disabled={!(formData.institution || formData.institution)}
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
