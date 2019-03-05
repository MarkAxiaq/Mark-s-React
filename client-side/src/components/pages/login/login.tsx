import * as React from "react";
import {Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {loggedIn, setToken } from "../../../helpers/auth/authHelperMethods";
import {graphql, compose} from 'react-apollo';
import {userLogin} from './loginGraphQL.schema';
import {loginFormValues, LoginFormSchema} from "./loginFormikForm.schema";
import {ShowAlert} from "../../common/index";
import {ILoginState} from "./login.interface";

class Login extends React.Component<any, ILoginState> {

    constructor(props: any){
        super(props)

        this.state = {
            loginFormMessage: '',
            alertPosition: 'alertMargin',
            alertColor: 'danger',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.showLoginFormMessage = this.showLoginFormMessage.bind(this);
    }

    public componentWillMount(){
        if(loggedIn()) {
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
                                    {this.showLoginFormMessage()}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    private onSubmit = (formValues, actions) => {
        this.setState({loginFormMessage: ''});
        actions.setSubmitting(false);
        this.props.userLogin({
            variables: {
                email: formValues.email,
                password: formValues.password
            }
        }).then(res => {
            if(res.data && res.data.userLogin.success){
                setToken(res.data.userLogin.token);
                this.props.history.push('/home');
            } else {
                this.setState({loginFormMessage: res.data.userLogin.message})
            }
        }).catch(e => {
            this.setState({loginFormMessage: `${e}`});
            console.log(`loginPage >> onUserLogin >> onSubmit >> ${e}`);
        });
    };

    private showLoginFormMessage = () => {
        if(this.state.loginFormMessage !== ''){
            return (
                <ShowAlert
                    color={this.state.alertColor}
                    message={this.state.loginFormMessage}
                    position={this.state.alertPosition}/>
            )
        }
        return null
    }
}

export default  compose(
    graphql(userLogin, {name: 'userLogin'})
)(Login);