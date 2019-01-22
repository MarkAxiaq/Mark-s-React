import * as React from "react";
import { Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {Formik, Form, Field, ErrorMessage} from "formik";
import AuthHelperMethods from "../../../helpers/auth/authHelperMethods";
import {graphql, compose} from 'react-apollo';
import {userLogin} from '../../../graphQlQueries/login.schema';
import {loginFormValues, LoginFormSchema} from "../../../formsSchema/login.schema";

const Auth = new AuthHelperMethods();

class Login extends React.Component<any, any> {

    constructor(props: any){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    public componentWillMount(){
        if(Auth.loggedIn()) {
            this.props.history.replace('/home');
        }
    }

    public render() {
        return(
            <div id="login" className="container-fluid">
                <div className="row justify-content-center pageMarginTop">
                    <div className="col-12 col-sm-6 col-md-4">
                        <h1>Login</h1>
                        <Formik
                            initialValues={loginFormValues}
                            validationSchema={LoginFormSchema}
                            onSubmit={this.onSubmit}>
                            {({isSubmitting, errors, touched}) => (
                                <Form>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input tag={Field} type="email" name="email" id="email" autoComplete="email"
                                               placeholder="Your email" invalid={errors.email && touched.email}/>
                                        <FormFeedback><ErrorMessage name="email"/></FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input tag={Field} type="password" name="password" id="password" className="form-control"
                                               autoComplete="password" placeholder="Your password" invalid={errors.password && touched.password}/>
                                        <FormFeedback><ErrorMessage name="password"/></FormFeedback>
                                    </FormGroup>
                                    <Button type='submit' disabled={isSubmitting}>Submit</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    private onSubmit = (formValues, actions) => {
        setTimeout(() =>{
            actions.setSubmitting(false)
            console.log(formValues)

            this.props.userLogin({
                variables: {
                    email: formValues.email,
                    password: formValues.password
                }
            }).then(res => {

                console.log(res)
                console.log(res)
                console.log(res)

                if(res.data && res.data.userLogin.success){
                    Auth.setToken(res.data.userLogin.token);
                    this.props.history.push('/home');
                }
            }).catch(e => {
                console.log(`onUserLogin - Error: ${e}`);
            });
        }, 1000);
    }
}

export default  compose(
    graphql(userLogin, {name: 'userLogin'})
)(Login);