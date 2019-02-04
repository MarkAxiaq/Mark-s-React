import * as React from "react";
import {graphql, compose} from "react-apollo";
import {getAllWebsites, addWebsite, updateWebsite, deleteWebsite} from "./websitesGraphQL.schema";
import {IWebsiteProps, IWebsiteState, IWebsite} from "./websites.interface";
import {NameEditDelete, FormikForm} from "../../common/index";
import {WebsitesFormikFormSchema, AddWebsiteValues} from './websitesFormikForm.schema';
import ShowAlert from "../../common/alert/alert";

class Websites extends React.Component<IWebsiteProps, IWebsiteState> {
    constructor(props: any) {
        super(props);

        this.state = {
            websiteFormMessage: '',
            alertColor: 'danger',
            alertPosition: 'alertBottomRightPosition'
        };

        this.getWebsites = this.getWebsites.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.showWebsiteFormMessage = this.showWebsiteFormMessage.bind(this);
    };

    public render() {
        return (
            <div id="websitesPage">
                <h4>Add a new Website</h4>
                <FormikForm
                    initialValues={AddWebsiteValues}
                    validationSchema={WebsitesFormikFormSchema}
                    onSubmit={this.onSubmit}/>
                {this.showWebsiteFormMessage()}
                <br/>
                <h4>All Websites</h4>
                {this.getWebsites()}
            </div>
        );
    };

    private showWebsiteFormMessage = () => {
        if(this.state.websiteFormMessage !== ''){
            return (
                <ShowAlert
                    color={this.state.alertColor}
                    message={this.state.websiteFormMessage}
                    position={this.state.alertPosition}/>
            )
        }
        return null
    };

    private getWebsites = () => {
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
    };

    private onSubmit = (formValues, actions) => {
        this.setState({websiteFormMessage: ''});
        this.props.addWebsite({
            variables: {
                name: formValues.websiteName
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            actions.setSubmitting(false);
            if(res.data.addWebsite.success) {
                formValues.websiteName = '';
                this.setState({
                    websiteFormMessage: res.data.addWebsite.message,
                    alertColor: 'success'
                });
            } else{
                this.setState({
                    websiteFormMessage: res.data.addWebsite.message,
                    alertColor: 'danger'
                });
            }
        }).catch(e => {
            this.setState({
                websiteFormMessage: `${e}`,
                alertColor: 'danger'
            });
            console.log(`websitesPage >> onAddWebsite >> onSubmit >> ${e}`);
        });
    };

    private onEdit = newData => {
        this.setState({websiteFormMessage: ''});
        this.props.updateWebsite({
            variables: {
                id: newData.id,
                name: newData.name
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            if(res.data.updateWebsite.success){
                this.setState({
                    websiteFormMessage: res.data.updateWebsite.message,
                    alertColor: 'success'
                });
            } else{
                this.setState({
                    websiteFormMessage: res.data.updateWebsite.message,
                    alertColor: 'danger'
                });
            }
        }).catch(e => {
            this.setState({
                websiteFormMessage: `${e}`,
                alertColor: 'danger'
            });
            console.log(`websitesPage >> onEditWebsite >> onEdit >> ${e}`);
        });
    };

    private onDelete = id => {
        this.setState({websiteFormMessage: ''});
        this.props.deleteWebsite({
            variables: {
                id
            },
            refetchQueries:[{query: getAllWebsites}]
        }).then((res: any) => {
            if(res.data.deleteWebsite.success){
                this.setState({
                    websiteFormMessage: res.data.deleteWebsite.message,
                    alertColor: 'success'
                });
            } else{
                this.setState({
                    websiteFormMessage: res.data.deleteWebsite.message,
                    alertColor: 'danger'
                });
            }
        }).catch(e => {
            this.setState({
                websiteFormMessage: `${e}`,
                alertColor: 'danger'
            });
            console.log(`websitesPage >> onDeleteWebsite >> onDelete >> ${e}`);
        });
    };
}

export default compose(
    graphql(getAllWebsites,{name: 'getAllWebsites'}),
    graphql(addWebsite,{name: 'addWebsite'}),
    graphql(updateWebsite,{name: 'updateWebsite'}),
    graphql(deleteWebsite,{name: 'deleteWebsite'})
)(Websites);