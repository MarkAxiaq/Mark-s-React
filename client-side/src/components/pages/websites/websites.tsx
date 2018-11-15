import * as React from "react";
import {graphql, compose} from "react-apollo";
import {getAllWebsites, addWebsite, updateWebsite, deleteWebsite} from "../../../graphQlSchema/websites.schema";
import {IWebsiteProps, IWebsite} from "../../../models/websites.interface";
import {NameEditDelete} from "../../common/index";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "./websites.scss";

const initialValues ={
    name: '',
    surname: ''
}

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});


class Websites extends React.Component<IWebsiteProps, {}> {
    constructor(props: any) {
        super(props);

        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        return (
            <div id="websitesPage">
                <h1>Websites</h1>
                {this.renderContent()}

                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={this.onSubmit}>
                    {({isSubmitting}) => (
                        <Form>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" />
                            <Field type="text" name="surname" />
                            <ErrorMessage name="surname" />
                            <button className='btn btn-success' type='submit' disabled={isSubmitting}>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }


    private onSubmit = (formValues, actions) => {
        setTimeout(() =>{
            alert(JSON.stringify(formValues, null, 2));
            actions.setSubmitting(false)
        }, 1000);
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
                            id={item.id}
                            name={item.name}
                            onConfirm={this.onConfirm}
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

    private onConfirm = newData => {
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