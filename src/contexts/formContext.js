import React from "react"

export const FormContext = React.createContext()


function FormContextProvider({ children }) {


    const localState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("form")) : null


    const [form, setFormData] = React.useState({
        full_name: "",
        email: "",
        phone_number: "",
        educational_qualification: "None",
        professional_qualification: "None",
        date: "",
        nysc: "",
        birth: "",
        attestation: ""
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