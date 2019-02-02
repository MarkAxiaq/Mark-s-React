import * as React from 'react';
import { Alert } from 'reactstrap';
import {IAlertProps, IAlertState} from './alert.interface';
import "./alert.css";

class ShowAlert extends React.Component<IAlertProps, IAlertState> {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    public render() {
        return (
            <Alert className={this.props.position} color={this.props.color} isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.message}
            </Alert>
        );
    }

    private onDismiss() {
        this.setState({ visible: false });
    }
}

export default ShowAlert;