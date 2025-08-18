import React from 'react';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';





function Redirection() {
    // const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        // setRequestStatus(REQUEST_STATUS.LOADING);
        async function fetchData() {
            try {
                const result = await axios.get(`${process.env.PUBLIC_URL}/data.json`);
                setData(result?.data?.note);
                // setRequestStatus(REQUEST_STATUS.SUCCESS)
            } catch (error) {
                // setRequestStatus(REQUEST_STATUS.FAILURE);
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    return (
        <AnimatedPage>

            <div className='summary'>


                <h2>Note</h2>


                <ol className='d-flex'>
                    {
                        data && data.map((item, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: item?.note }} >

                            </li>
                        ))
                    }
                </ol>

                <a
                    href="https://www.citn.org/mem_reg.php?mtype=DIRECT"
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
