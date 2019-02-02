import * as Yup from 'yup'

const loginFormValues ={
    email: '',
    password: ''
}

const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email")
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
});

export {loginFormValues, LoginFormSchema};