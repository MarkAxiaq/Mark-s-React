import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import {IPopupProps, IPopupState} from './popup.interface';

class Popup extends React.Component<IPopupProps, IPopupState> {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    public render() {
        return (
            <React.Fragment>
                <Button className="btn btn-danger" type="button" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.content}
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button color="warning" onClick={this.toggle}>{this.props.orangeBtnText}</Button>
                            <Button color="success" onClick={this.confirm}>{this.props.greenBtnText}</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

    private toggle(): void {
        this.setState({
            modal: !this.state.modal
        });
    }

    private confirm(): void {
        this.setState({
            modal: !this.state.modal
        });
        this.props.onConfirm();
    }
}

export default Popup;