interface INameEditDeleteProps {
    usedFor: string,
    id: string,
    name:string,
    onEdit: (parameter: IEditedData) => void
    onDelete: (parameter: string) => void
};

interface INameEditDeleteState {
    disabled: boolean,
    editedName: string
};

interface IEditedData {
    id: string,
    name:string,
}

export {INameEditDeleteProps, INameEditDeleteState}