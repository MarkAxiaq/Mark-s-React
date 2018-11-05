import * as React from "react";
import {INameEditDeleteProps, INameEditDeleteState} from "../../../models/nameEditDelete.interface";
import {ModalExample} from "../index"
import "./nameEditDelete.css";


// <IWebsite, INameEditDeleteState> Represent props and state ==> Needed to be initialised by Typescript
class NameEditDelete extends React.Component<INameEditDeleteProps, INameEditDeleteState> {

    constructor(props){
        super(props);

        this.state = {
            disabled: true,
            editedName: this.props.name
        }

        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        return(
                <div className="input-group input-group-sm topBottomPadding">
                    <input type="text"
                           className="form-control"
                           placeholder={this.props.name}
                           value={this.state.editedName}
                           disabled={this.state.disabled}
                           aria-label={this.props.name}
                           aria-describedby={this.props.name}
                           onChange={this.onChange}/>
                        {this.state.disabled
                            ?
                                <div className="input-group-append">
                                    <button className="btn btn-warning" type="button" onClick={this.onEdit}>Edit</button>
                                    <ModalExample
                                        id={this.props.id}
                                        buttonLabel={'Delete'}
                                        title={'Delete'}
                                        content={`Are you sure you want to delete ${this.props.name}?`}
                                        redBtnText={'No'}
                                        greenBtnText={'Yes'}
                                        onConfirm = {this.onDelete}
                                    />
                                </div>
                            :
                                <div className="input-group-append">
                                    <button className="btn btn-warning" type="button" onClick={this.onEdit}>Back</button>
                                    <button className="btn btn-success" type="button" onClick={this.onConfirm}>Confirm</button>
                                </div>
                        }
                </div>
        );
    }

    private onEdit = () =>  {
        this.setState({
            disabled: !this.state.disabled
        })
    };

    private onChange = (event) =>  {
        const newState = Object.assign(this.state, {editedName: event.target.value});
        this.setState(newState);
    };

    private onConfirm = () =>  {
        this.props.onConfirm({id: this.props.id, name: this.state.editedName});
    };

    private onDelete = () =>  {
        this.props.onDelete(this.props.id);
    };
}

export default NameEditDelete;