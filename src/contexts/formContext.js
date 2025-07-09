import React from "react";

export const FormContext = React.createContext();

function FormContextProvider({ children }) {
    const [form, setFormData] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("form");
            if (saved) {
                return JSON.parse(saved);
            }
        }
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
        };
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("form", JSON.stringify(form));
        }
    }, [form]);

    return (
        <FormContext.Provider value={{ formData: form, setFormData }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;
