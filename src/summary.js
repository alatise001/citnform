import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormContext } from './contexts/formContext';
import AnimatedPage from './AnimatedPage';

function Summary() {

    const { formData, setFormData } = React.useContext(FormContext)
    return (
        <AnimatedPage>

            <div className='summary'>

                <h2 className='summaryHeader1'>
                    Hi {formData.name},
                </h2>

                {(formData.outPayment === "no" && formData.inductionPayment === "no" && (2024 - formData.year) > 1 && formData.institution !== "none") ? (
                    <h3 className='summaryHeader2'>
                        You are  <b>Qualified</b> for this program
                    </h3>
                ) : (
                    <h3 className='summaryHeader2'>
                        Sorry, you are not <strong>Qualified</strong> for this program
                    </h3>
                )}

                {!(formData.outPayment !== "yes") && (<p>
                    You need to complete your outstanding payment
                </p>)
                }

                {!(formData.inductionPayment !== "no") && (<p>
                    You have not paid your induction fee
                </p>)
                }

                {(formData.institution === "None") && (<p>
                    You need to have graduated from one of the listed institutions
                </p>)
                }

                {(2024 - formData.year) < 1 && (<p>
                    You need to have graduated at least a year ago</p>)}

                <Link to={"/"}>
                    <button onClick={() => setFormData(() => {
                        return {
                            name: "",
                            institution: "None",
                            year: 0,
                            outPayment: "",
                            inductionPayment: "",
                        }
                    })
                    } className='subBtn resetBtn'>
                        Restart
                    </button>
                </Link>
            </div>
        </AnimatedPage>

    );
}

export default Summary;
