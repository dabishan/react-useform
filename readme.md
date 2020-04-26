# React UseForm

React UseForm is a lightweight utility to make handling form validation easy with React Hooks.

Currently it supports the following feature:
- Controlling input change without needing to write your own code
- Adding basic validations as well as custom validations
- Form states (IsValid, isPristine) to provide more power to the form
- Setting custom errors externally


## Installation
You can install it as a npm package:
```
npm install --save react-useform
```

## Usage
Import useForm to start:
```
import { useForm } from 'react-useform';
```

You can initialize useForm with:
```
const { isValid, isPristine, useFormInput } = useForm();
```
Once initialized, `useFormInput` hook can now be use to add inputs to the form:
```
const firstname = useFormInput('firstname', '', {
	required: 'First name is required'
});
const lastname = useFormInput('lastname', '', {
	required: 'Last name is required'
});
const gender = useFormInput('lastname', 'male');
```
The `usename`, `password`, `gender` have all you need to start using them in your logic and the template.
```
<form onSubmit={submit}>
    <input name={firstName.name} value={firstName.value} onChange={firstName.onChange}></input>
    {firstName.error && <div className="error">{firstName.error}</div>}
    
    <input name={lastName.name} value={lastName.value} onChange={lastName.onChange}></input>
    {lastName.error && <div className="error">{lastName.error}</div>}

    <select name={role.name} onChange={role.onChange}>
        <option value="male" selected={role.value}>Male</option>
        <option value="female" selected={role.value}>Female</option>
    </select>
    
    <Button disabled={isPristine || !isValid} type="submit">Submit</Button>
</form>
```


