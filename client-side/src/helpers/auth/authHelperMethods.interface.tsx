interface IGetUser {
    _id? : string,
    name?: string,
    surname?: string,
    email?: string,
    age?: number,
    contactNumber?: number,
    admin?: boolean,
    websites?: IWebsites
}

interface IWebsites {
    id?: string,
    name?: string
}

export {IGetUser}