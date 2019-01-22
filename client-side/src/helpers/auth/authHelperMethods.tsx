import decode from 'jwt-decode';
export default class AuthService {

    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.getProfile = this.getProfile.bind(this)
    }

    public loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    public isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    public setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    public getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    public logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    public getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    public fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            const headerKey = 'Authorization';
            headers[headerKey] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    public _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            const error: any = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}