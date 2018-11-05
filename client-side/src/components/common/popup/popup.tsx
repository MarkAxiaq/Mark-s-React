import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component<{id, buttonLabel, title, content, redBtnText, greenBtnText, onConfirm}, {modal}> {
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
                        <Button color="danger" onClick={this.toggle}>{this.props.redBtnText}</Button>
                        <Button color="success" onClick={this.confirm}>{this.props.greenBtnText}</Button>{' '}
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    private confirm() {
        this.setState({
            modal: !this.state.modal
        });
        this.props.onConfirm();
    }
}

export default ModalExample;