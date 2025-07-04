import React from 'react';
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

function Redirection() {

    const { formData, setFormData } = React.useContext(FormContext)
    const [redirect, setRedirect] = React.useState(false);
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get('/data.json');
                setData(result.data.note);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);



    React.useEffect(() => {
        const isQualified = formData.educational_qualification !== "None" &&
            formData.professional_qualification !== "None" &&
            (2025 - formData.year) >= 1 &&
            formData.attestation === true &&
            formData.nysc === "yes" &&
            formData.birth === "yes";

        if (isQualified) {
            setRedirect(true);
        }
    }, [formData.attestation, formData.birth, formData.educational_qualification, formData.nysc, formData.professional_qualification, formData.year])


    return (
        <AnimatedPage>

            <div className='summary'>


                <h2>Note</h2>


                <ol className='d-flex'>
                    {
                        data && data.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item.note }} >

                            </li>
                        ))
                    }
                </ol>

                <a
                    href="https://www.citn.org/mem_reg.php?mtype=PFS"
                    // target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <button className='subBtn resetBtn redirectBtn'>
                        Click to proceed to the <b>
                            registration website</b>
                    </button>
                </a>



            </div>
        </AnimatedPage >

    );
}

export default Redirection;
