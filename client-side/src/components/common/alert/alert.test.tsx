import * as React from 'react';
import { shallow } from 'enzyme';
import AlertComponent from './alert';
import { Alert } from 'reactstrap';

describe('AlertComponent', () => {

    const wrapper = shallow(<AlertComponent message={'Test Alert Message!'} color={'red'} position={'alertBottomRightPosition'}/>);
    const instance = wrapper.instance() as AlertComponent;

    it('should change state when onDismiss method is called', () => {
        expect(wrapper.state()).toEqual({visible: true});
        instance.onDismiss();
        expect(wrapper.state()).toEqual({visible: false});
    });

    it('should create Alert with the correct class', () => {
        expect(wrapper.find(Alert).hasClass('alertBottomRightPosition')).toBeTruthy();
    });

    it('should create Alert with the correct props', () => {
        expect(wrapper.find(Alert).props()).toHaveProperty('color', 'red');
        expect(wrapper.find(Alert).props()).toHaveProperty('children', 'Test Alert Message!');
    });
});