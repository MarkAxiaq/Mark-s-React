interface IPopupProps {
    id: string,
    buttonLabel: string,
    title: string,
    content: string,
    orangeBtnText: string,
    greenBtnText: string,
    onConfirm: () => void
}

interface IPopupState {
    modal: boolean
}

export {IPopupProps, IPopupState}