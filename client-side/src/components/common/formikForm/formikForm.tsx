import * as React from "react";
import { Button, FormGroup, Col, Input, FormFeedback} from 'reactstrap';
import {ErrorMessage, Field, Form, Formik} from "formik";

export default (props) => {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}>
            {({isSubmitting, errors, touched}) => (
                <Form>
                    <FormGroup row={true}>
                        <Col sm="4">
                            <Input type="text" name="websiteName" placeholder="Website Name"
                                   tag={Field}
                                   invalid={errors.websiteName && touched.websiteName} />
                            <FormFeedback><ErrorMessage name="websiteName" /></FormFeedback>
                        </Col>
                    </FormGroup>
                    <Button color="success" type='submit' disabled={isSubmitting}>Submit</Button>
                </Form>
            )}
        </Formik>
    );
}

