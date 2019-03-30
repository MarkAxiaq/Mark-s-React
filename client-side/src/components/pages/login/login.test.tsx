import * as React from 'react';
import {shallow} from 'enzyme';
import {LoginComponent} from './login';

import * as Auth from "../../../helpers/auth/authHelperMethods";
// Mocking all methods in Auth
jest.mock("../../../helpers/auth/authHelperMethods");

describe('LoginComponent', () => {
    const mockFailedResonse = {
        data: {
            userLogin: {
                user: {name: 'Failure'},
                success: false,
                message: 'Some Error Message'
            }
        }
    }
    const mockSuccessResonse = {
        data: {
            userLogin: {
                user: {name: 'Success'},
                success: true,
                message: 'Some Success Message'
            }
        }
    }
    const userLoginPromiseMock = jest.fn((formValues) => Promise.resolve(mockSuccessResonse));
    const wrapper = shallow(<LoginComponent history={[]} userLogin={userLoginPromiseMock} />);
    const instance = wrapper.instance() as LoginComponent;

    it('should display Login text as title', () => {
        expect(wrapper.containsMatchingElement(<h1>Login</h1>)).toBe(true);
    });

    it('should check if user is loggedIn in componentWillMount', () => {
        expect(Auth.loggedIn).toHaveBeenCalled();
        expect(Auth.loggedIn).toHaveBeenCalledTimes(1);
    });

    it('should check if user is loggedIn in componentWillMount and if false continue to Login', () => {
        expect(instance.props).toHaveProperty('history', []);
        instance.componentWillMount();
        expect(instance.props).not.toHaveProperty('history', ["/home"]);
    });

    it('should check if user is loggedIn and if true redirect', () => {
        const loggedInMock = jest.spyOn(Auth, 'loggedIn');
        loggedInMock.mockImplementation(() => true);
        expect(instance.props).toHaveProperty('history', []);
        instance.componentWillMount();
        expect(instance.props).toHaveProperty('history', ["/home"]);
    });

    it('should call setSubmitting when onSubmit is called', () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        instance.onSubmit(formValues, actions);
        expect(actions.setSubmitting).toHaveBeenCalled();
    });

    it('should call props.userLogin with the correct data when onSubmit is called', () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        instance.onSubmit(formValues, actions);
        expect(userLoginPromiseMock).toHaveBeenCalled();
        expect(userLoginPromiseMock).toHaveBeenCalledWith({variables : formValues});
    });

    it('should call setToken if data success is true', () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        const setUserMock = jest.spyOn(Auth, 'setUser');
        instance.onSubmit(formValues, actions);
        expect(setUserMock).toHaveBeenCalled();
        expect(setUserMock).toHaveBeenCalledWith({name: 'Success'});
    });

    it('should not call setToken if data success is false', () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        userLoginPromiseMock.mockImplementation(jest.fn(({}) => Promise.resolve(mockFailedResonse)));
        const setUserMock = jest.spyOn(Auth, 'setUser');
        instance.onSubmit(formValues, actions);
        expect(setUserMock).not.toHaveBeenCalledWith({name: 'Failure'});
    });

    it('should not call setToken if data success is false and update state', async () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        userLoginPromiseMock.mockImplementation(jest.fn(({}) => Promise.resolve(mockFailedResonse)));
        await instance.onSubmit(formValues, actions);
        wrapper.update();
        expect(wrapper.state()).toEqual({
            loginFormMessage: 'Some Error Message',
            alertPosition: 'alertMargin',
            alertColor: 'danger'
        });
        expect(wrapper.state()).toHaveProperty('loginFormMessage', 'Some Error Message');
    });

    it('should catch the error if the Promise is rejected and update state', async () => {
        const formValues = {email:'test', password:'testPassword'};
        const actions = {
            setSubmitting : jest.fn((submitting) => undefined)
        };
        userLoginPromiseMock.mockImplementation(jest.fn(({}) => Promise.reject(new Error('Promise Error for test'))));
        await instance.onSubmit(formValues, actions);
        await wrapper.update();
        expect(wrapper.state()).toEqual({
            loginFormMessage: 'Promise Error for test',
            alertPosition: 'alertMargin',
            alertColor: 'danger'
        });
        expect(wrapper.state()).toHaveProperty('loginFormMessage', 'Promise Error for test');
    });
});