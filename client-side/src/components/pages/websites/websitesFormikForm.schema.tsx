import * as Yup from "yup";

const AddWebsiteValues = {
    websiteName: ''
}

const WebsitesFormikFormSchema = Yup.object().shape({
    websiteName: Yup.string()
        .min(3, 'A minimum of 3 characters are required!')
        .max(50, 'Maximum characters allowed are 50!')
        .required('Required')
});

export {WebsitesFormikFormSchema, AddWebsiteValues};