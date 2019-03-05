import * as React from 'react';
import { shallow } from 'enzyme';
import PopupComponent from './popup';
import { Button } from 'reactstrap';

describe('PopupComponent', () => {

    const onConfirmMock = jest.fn(() => undefined);
    const wrapper = shallow(<PopupComponent id={'1'} buttonLabel={'Test Button Label'} title={'Test Title'} content={'Test Content'} orangeBtnText={'Test Orange Button text'} greenBtnText={'Test Green Button Text'} onConfirm={onConfirmMock}/>);
    const instance = wrapper.instance() as PopupComponent;

    it('should change state when toggle method is called', () => {
        expect(wrapper.state()).toEqual({modal: false});
        instance.toggle();
        expect(wrapper.state()).toEqual({modal: true});
    });

    it('should call onConfirmMock when confirm method is called', () => {
        instance.confirm();
        expect(onConfirmMock).toHaveBeenCalled();
        expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });

    it('should change state when confirm method is called', () => {
        const currentState =  wrapper.state();
        instance.confirm();
        expect(wrapper.state()).not.toEqual(currentState);
    });

    // SOME DIFFERENT SOLUTIONS TO FIND TEXT IN COMPONENT AND TEST IT
    it('should be created with the correct ModalBody text', () => {
        expect(wrapper.contains('Some different text')).toBe(false);
        expect(wrapper.contains('Test Content')).toBe(true);
    });

    it('should be created with the correct ModalHeader text', () => {
        expect(wrapper.contains('Test Title')).toBe(true);
    });

    it('should be created with the correct button label text', () => {
        expect(wrapper.find('.btn-danger').shallow().text()).toEqual('Test Button Label')
    });

    it('should be created with the correct orange button text', () => {
        expect(wrapper.containsMatchingElement(<Button color="warning" onClick={this.toggle}>Test Orange Button text</Button>)).toBe(true);
        expect(wrapper.containsMatchingElement(<Button color="warning" onClick={this.toggle}>Some different text</Button>)).toBe(false);
    });

    it('should be created with the correct green button text', () => {
        expect(wrapper.find('[data-test="confirmButton"]').shallow().text()).toEqual('Test Green Button Text')
    });
});
