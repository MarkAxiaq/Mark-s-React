import * as React from "react";
import {graphql, compose} from "react-apollo";
import {getAllWebsites, addWebsite, updateWebsite, deleteWebsite} from "../../../graphQlSchema/websites.schema";
import {IWebsiteProps, IWebsite} from "../../../models/websites.interface";
import {NameEditDelete} from "../../common/index";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {AddWebsiteSchema, AddWebsiteValues} from '../../../formsSchema/addWebsite.schema';
import {Button, FormGroup, Input, FormFeedback, Col} from 'reactstrap';

class Websites extends React.Component<IWebsiteProps, {}> {
    constructor(props: any) {
        super(props);

        this.renderContent = this.renderContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        return (
            <div id="websitesPage">
                <h4>Add a new Website</h4>
                <Formik
                    initialValues={AddWebsiteValues}
                    validationSchema={AddWebsiteSchema}
                    onSubmit={this.onSubmit}>
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
                <br/>
                <h4>All Websites</h4>
                {this.renderContent()}
            </div>
        );
    }

    private renderContent = () => {
        const {loading, websites, error} = this.props.getAllWebsites as any;

        if (loading) {
            return <p>Loading...</p>
        }

        if (!loading && websites) {
            return websites.map((item: IWebsite) => {
                return (
                    <div key={item.id}>
                        <NameEditDelete
                            usedFor = 'website'
                            id={item.id}
                            name={item.name}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                        />
                    </div>
                );
            })
        }

        if (error) {
            return <p>No Data...</p>
        }
    }

    private onSubmit = (formValues, actions) => {
        this.props.addWebsite({
            variables: {
                name: formValues.websiteName
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            if(res.data.addWebsite.name){
                console.log(res.data);
                console.log(`${formValues.websiteName} was added successfully to Websites`);
                actions.setSubmitting(false);
                formValues.websiteName = '';
            }
        }).catch(e => {
            console.log(`onConfirm - Error: ${e}`);
        });
    }

    private onEdit = newData => {
        this.props.updateWebsite({
            variables: {
                id: newData.id,
                name: newData.name
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            if(res.data){
                console.log(`${newData.name} was updated successfully to ${res.data.name}`);
            }
        }).catch(e => {
            console.log(`onConfirm - Error: ${e}`);
        });
    }

    private onDelete = id => {
        this.props.deleteWebsite({
            variables: {
                id
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            if(res.data){
                console.log(`${res.data.name} was deleted successfully`);
            }
        }).catch(e => {
            console.log(`onDelete - Error: ${e}`);
        });
    }
}

export default compose(
    graphql(getAllWebsites,{name: 'getAllWebsites'}),
    graphql(addWebsite,{name: 'addWebsite'}),
    graphql(updateWebsite,{name: 'updateWebsite'}),
    graphql(deleteWebsite,{name: 'deleteWebsite'})
)(Websites);