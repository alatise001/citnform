import React, { useReducer } from "react"

export const FormContext = React.createContext()


function FormContextProvider({ children }) {


    // function formFunction(state, action) {
    //     switch (action.type) {
    //         case "setForm": {
    //             return action.data
    //         }
    //         default:
    //             return state
    //     }

    // }



    const localState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("form")) : null

    // const [form, dispatch] = useReducer(formFunction, localState || {
    //     name: "",
    //     institution: "",
    //     year: "",
    //     outPayment: "",
    //     inductionPayment: "",

    // })

    const [form, setFormData] = React.useState({
        name: "",
        institution: "None",
        year: 2024,
        outPayment: "",
        inductionPayment: "",
    } || localState);


    React.useEffect(() => {

        localStorage.setItem("form", JSON.stringify(form));
    }, [form]);

    return (

        < FormContext.Provider value={{ formData: form, setFormData }
        }>
            {children}
        </FormContext.Provider >
    )
}

export default FormContextProvider