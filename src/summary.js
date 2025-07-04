import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';
import isOverAYearOld from './hooks/dateChecker';
function Summary() {

    const { formData, setFormData } = React.useContext(FormContext)

    const [redirect, setRedirect] = React.useState(false);
    const [loading, setloading] = React.useState(false);


    const date = isOverAYearOld(formData.date);


    React.useEffect(() => {
        const isQualified = formData.educational_qualification !== "None" &&
            formData.professional_qualification !== "None" &&
            date &&
            formData.attestation === true &&
            formData.nysc === "yes" &&
            formData.birth === "yes";

        if (isQualified) {
            setRedirect(true);
        }
    }, [formData.attestation, formData.birth, formData.educational_qualification, formData.nysc, formData.professional_qualification, date])

    if (loading) return (<div className="container">...LOADING</div>)



    return (
        <AnimatedPage>

            <div className='summary'>

                <h2 className='summaryHeader1'>
                    Hi {formData.full_name},
                </h2>

                {(redirect) ? (
                    < h3 className='summaryHeader2'>
                        You are  <b style={{ color: "green" }}>Eligible</b> to apply for <b>Direct Membership</b> of the Institute
                    </h3>
                ) : (
                    <h3 className='summaryHeader2'>
                        Sorry, you are not <b style={{ color: "red" }}>Eligible</b> to apply for <b>Direct Membership</b> of the Institute
                    </h3>
                )}

                {(formData.professional_qualification === "None") && (
                    <div className='summaryHeader3'>
                        <h5>Professional Qualification:</h5>
                        <p>
                            You need a valid <b>Professional Certificate</b>
                        </p>
                    </div>
                )
                }

                {(formData.educational_qualification === "None") && (
                    <div className='summaryHeader3'>
                        <h5>Educational qualification:</h5>
                        <p>
                            You need a valid <b>Educational Qualification</b>
                        </p>
                    </div>
                )
                }

                {((formData.nysc === "no") || (formData.nysc === " ")) && (
                    <div className='summaryHeader3'>
                        <h5>NYSC Certificate:</h5>
                        <p>
                            You need your <b>NYSC Certificate OR Exemption Letter</b>
                        </p>
                    </div>
                )
                }

                {((formData.birth === "no") || (formData.birth === " ")) && (
                    <div className='summaryHeader3'>
                        <h5>Birth Certificate:</h5>
                        <p>
                            You need your <b>Birth Certificate</b>
                        </p>
                    </div>
                )}

                {!date && formData.date === " " && (
                    <div className='summaryHeader3'>
                        <h5>Induction Date:</h5>
                        <p>
                            You need to have been <b>Inducted</b> for at least a year
                        </p>
                    </div>
                )
                }

                {redirect ? (
                    <Link to={"/redirection"} className='links'>
                        <button onClick={() => {
                            setFormData(() => {
                                return {
                                    full_name: "",
                                    email: "",
                                    phone_number: "",
                                    educational_qualification: "None",
                                    professional_qualification: "None",
                                    date: "",
                                    nysc: "",
                                    birth: "",
                                    attestation: ""
                                }
                            })
                            setloading(true);

                        }} className='subBtn resetBtn'>
                            click here to proceed to registration
                        </button>
                    </Link>
                ) : (
                    <>
                        <a
                            href="https://www.citn.org"
                            // target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <button className='subBtn resetBtn' onClick={() => {
                                setFormData(() => {
                                    return {
                                        full_name: "",
                                        email: "",
                                        phone_number: "",
                                        educational_qualification: "None",
                                        professional_qualification: "None",
                                        date: "",
                                        nysc: "",
                                        birth: "",
                                        attestation: ""
                                    }
                                })
                                setloading(true);

                            }}>
                                Visit CITN Official Website
                            </button>
                        </a>
                    </>
                )
                }

            </div>
        </AnimatedPage >

    );
}

export default Summary;
