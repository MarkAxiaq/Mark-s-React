import * as React from 'react';
import { shallow } from 'enzyme';
import NameEditDeleteComponent from './nameEditDelete';

describe('NameEditDeleteComponent', () => {

    const onEditMock = jest.fn(() => undefined);
    const onDeleteMock = jest.fn(() => undefined);
    const wrapper = shallow(<NameEditDeleteComponent usedFor={'Test'} id={'1'} name={'Some Name for Test'} onEdit={onEditMock} onDelete={onDeleteMock}/>);
    const instance = wrapper.instance() as NameEditDeleteComponent;

    it('should be created with the correct Input text', () => {
        expect(wrapper.find('.form-control').shallow().props()).toHaveProperty("placeholder", "Some Name for Test");
        expect(wrapper.find('.form-control').shallow().props()).toHaveProperty("value", "Some Name for Test");
    });

    it('should be created with the correct Edit button text', () => {
        expect(wrapper.find('.btn-warning').text()).toBe('Edit Test');
    });

    it('should change state and Html button when onEdit method is called', () => {
        const currentState =  wrapper.state();

        expect(wrapper.find('.btn-warning').text()).toBe('Edit Test');
        instance.onEdit();
        expect(wrapper.state()).not.toEqual(currentState);
        expect(wrapper.find('.btn-warning').text()).toBe('Back');
    });

    it('should change state when onChange method is called with an event', () => {
        const fakeEvent = {
            target: {
                value: 'fake event value'
            }
        };
        const currentState =  wrapper.state();

        expect(wrapper.state()).toHaveProperty("editedName", "Some Name for Test");
        instance.onChange(fakeEvent);
        expect(wrapper.state()).not.toEqual(currentState);
        expect(wrapper.state()).toHaveProperty("editedName", "fake event value");
    });

    it('should call props.onEdit when onEditConfirm is called', () => {
        instance.onEditConfirm();
        expect(onEditMock).toHaveBeenCalled();
        expect(onEditMock).toHaveBeenCalledTimes(1);
    });

    it('should call props.onDelete when onDelete is called', () => {
        instance.onDelete();
        expect(onDeleteMock).toHaveBeenCalled();
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });
});