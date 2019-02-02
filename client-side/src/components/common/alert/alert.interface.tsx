interface IAlertProps {
    message: string,
    color: string,
    position: string,
}

interface IAlertState {
    visible: boolean,
}

export {IAlertProps, IAlertState}