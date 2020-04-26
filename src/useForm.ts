import { useState } from "react";
import { FormError, ValidationOption } from "./types";

export const useForm = () => {
    const [errors, setErrors] = useState<FormError>({});
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isPristine, setIsPristine] = useState(true);

    const updateFormInput = (name: string, error: string) => {
        let newErrors = {...errors};
        if (error) {
            newErrors[name] = error
        } else {
            delete newErrors[name];
        }

        setIsPristine(false);
        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }

    const clearErrors = () => setErrors({});

    const useFormInput = (name: string, initialValue?: any, validationOption: ValidationOption = {}) => {
        const [value, setValue] = useState(initialValue);

        const onChange = (e:any) => {
            setValue(e.target.value);
            updateFormInput(name, getError(validationOption, e.target.value));
        }
        
        const setError = (err: string) => {
            updateFormInput(name, err);
        }

        return {name, value, setValue, onChange, error: errors[name], setError}
    }

    return {isValid, isPristine, errors, useFormInput, clearErrors, setErrors};
}

const getError = (validationOption: ValidationOption, val: any): string => {
    let err = ''
    if (validationOption) {
        if (validationOption.required && !val) {
            err = validationOption.required;
        } else if (validationOption.validateUsing) {
            if (Array.isArray(validationOption.validateUsing)) {
                for (const validator of validationOption.validateUsing){
                    err = validator(val);
                    if (err){
                        return err;
                    }
                }
            } else if (typeof validationOption.validateUsing === 'function'){
                err = validationOption.validateUsing(val);
            }
        }
    }

    return err;
}
