import decode from 'jwt-decode';

const loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken() // Getting token from localstorage
    return !!token && !isTokenExpired(token) // handwaiving here
}

const isTokenExpired = (token) => {
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

const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}

const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
}

const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
}

const getProfile = () => {
    // Using jwt-decode npm package to decode the token
    return decode(getToken());
}


const fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (loggedIn()) {
        const headerKey = 'Authorization';
        headers[headerKey] = 'Bearer ' + getToken()
    }

    return fetch(url, {
        headers,
        ...options
    })
        .then(checkStatus)
        .then(response => response.json())
}

const checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
        return response
    } else {
        const error: any = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export {loggedIn, isTokenExpired, setToken, logout, getProfile}