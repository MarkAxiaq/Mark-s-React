import * as React from 'react';
import { shallow } from 'enzyme';
import FooterComponent from './footer';

describe('FooterComponent', () => {

    const wrapper = shallow(<FooterComponent/>);

    it('should render © ALL RIGHTS RESERVED as footer text', () => {
        expect(wrapper.contains('© ALL RIGHTS RESERVED')).toBe(true);
    });
});
