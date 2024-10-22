import React from 'react'
import { useNavigate } from 'react-router-dom';




function Back(props) {
    const navigate = useNavigate();

    navigate(-1)
    // function goback(params) {
    // }
    // goback()
}

export default Back