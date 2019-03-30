import {IGetUser} from './authHelperMethods.interface';

const loggedIn = () => {
    // Todo: Change to Redux
    const auth = localStorage.getItem('auth');
    if(auth !== null) {
        const parsedAuth = JSON.parse(localStorage.getItem('auth') as string);
        return parsedAuth.authenticated;
    }
    return false;
};

const setUser = (user) => {
    // Todo: Change to Redux
    // Saves user to localStorage
    localStorage.setItem('userData', JSON.stringify(user));
};

const logout = () => {
    // Todo: Change to Redux
    // Todo: Call backend to clear session
    localStorage.removeItem('auth');
    localStorage.removeItem('userData');
};

const getUser: () => IGetUser = () => {
    // Todo: Change to Redux
    const user = localStorage.getItem('userData');
    if(user !== null) {
        return JSON.parse(localStorage.getItem('userData') as string);
    }
    return null;
};

export {loggedIn, setUser, logout, getUser}