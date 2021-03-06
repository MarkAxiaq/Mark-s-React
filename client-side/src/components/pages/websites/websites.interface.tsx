interface IWebsiteProps {
    getAllWebsites: () => Promise<object>,
    addWebsite: (object) => Promise<object>,
    updateWebsite: (object) => Promise<object>,
    deleteWebsite: (object) => Promise<object>,
}

interface IWebsiteState {
    websiteFormMessage: string,
    alertColor: string,
    alertPosition: string,
}

interface IWebsite {
    id: string,
    name:string,
}

interface IWebsites extends Array<IWebsite>{}

export {IWebsiteProps, IWebsiteState, IWebsite, IWebsites};