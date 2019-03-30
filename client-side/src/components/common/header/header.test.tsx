import * as React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './header';
import * as Auth from "../../../helpers/auth/authHelperMethods";

// Mocking all methods in Auth
jest.mock("../../../helpers/auth/authHelperMethods");

describe('HeaderComponent', () => {
    const wrapper = shallow(<HeaderComponent history={[]} />);
    const instance = wrapper.instance() as HeaderComponent;

    it('should change state when toggle method is called', () => {
        const currentState =  wrapper.state();
        instance.toggle();
        expect(wrapper.state()).not.toEqual(currentState);
    });

    it('should push to the props history when logout is called', () => {
        expect(instance.props).toEqual({ history: [] });
        instance.logout();
        expect(instance.props).toEqual({ history: ["/"]});
    });

    it('should call Auth.logout when logout is called', () => {
        expect(Auth.logout).toHaveBeenCalledTimes(1);
        instance.logout();
        expect(Auth.logout).toHaveBeenCalled();
        // instance.logout(); have been called twice in this test and the one before it...
        expect(Auth.logout).toHaveBeenCalledTimes(2);
    });

    it('should call loggedInOrOut to render the correct content in render', () => {
        const spy = jest.spyOn(instance, 'loggedInOrOut');
        instance.render();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should render the correct content when loggedInOrOut is called and Auth.loggedIn return false', () => {
        const loggedInMock = jest.spyOn(Auth, 'loggedIn');
        loggedInMock.mockImplementation(() => false);
        instance.loggedInOrOut();
        expect(wrapper.contains('Login')).toBe(true);
    });

    it('should render the correct content when loggedInOrOut is called and Auth.loggedIn return true', () => {
        const loggedInMock = jest.spyOn(Auth, 'loggedIn');
        loggedInMock.mockImplementation(() => true);
        const getUserMock = jest.spyOn(Auth, 'getUser');
        getUserMock.mockImplementation(() => ({name: 'Mark'}));
        instance.loggedInOrOut();
        // Shallow does not find direct child when inside React.Fragment
        // There is an open issue for React 16 support and as far as I see React.Fragment support is in progress. So, please check for updates.
        // expect(wrapper.containsMatchingElement(<p className="nav-link">Welcome Mark</p>)).toBe(true);
        // expect(wrapper.contains('Welcome')).toBe(true);
    });
});