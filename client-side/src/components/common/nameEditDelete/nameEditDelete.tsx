import * as React from "react";
import {INameEditDeleteProps, INameEditDeleteState} from "../../../models/nameEditDelete.interface";
import {Popup} from "../index"
import "./nameEditDelete.css";

class NameEditDelete extends React.Component<INameEditDeleteProps, INameEditDeleteState> {

    constructor(props){
        super(props);

        this.state = {
            disabled: true,
            editedName: this.props.name
        }

        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditConfirm = this.onEditConfirm.bind(this);
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
                                    <button className="btn btn-warning" type="button" onClick={this.onEdit}>Edit {this.props.usedFor}</button>
                                    <Popup
                                        id={this.props.id}
                                        buttonLabel={`Delete ${this.props.usedFor}`}
                                        title={'Delete'}
                                        content={`Are you sure you want to delete ${this.props.name}?`}
                                        orangeBtnText={'No'}
                                        greenBtnText={'Yes'}
                                        onConfirm = {this.onDelete}
                                    />
                                </div>
                            :
                                <div className="input-group-append">
                                    <button className="btn btn-warning" type="button" onClick={this.onEdit}>Back</button>
                                    <button className="btn btn-success" type="button" onClick={this.onEditConfirm}>Confirm edited name</button>
                                </div>
                        }
                </div>
        );
    }

    private readonly onEdit = (): void =>  {
        this.setState({
            disabled: !this.state.disabled
        })
    };

    private readonly onChange = (event): void =>  {
        this.setState({editedName: event.target.value});
    };

    private readonly onEditConfirm = (): void =>  {
        this.props.onEdit({id: this.props.id, name: this.state.editedName});
    };

    private readonly onDelete = (): void =>  {
        this.props.onDelete(this.props.id);
    };
}

export default NameEditDelete;