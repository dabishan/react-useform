
export interface FormInput {
    value: any;
    onChange: any;
    error: string;
}

export interface FormError {
    [key: string]: string;
}

export interface ValidationOption {
    required?: string;
    validateUsing?: ValidationFunc | ValidationFunc[];
    errorIf?: boolean;
}

export type ValidationFunc = (value: any) => string;