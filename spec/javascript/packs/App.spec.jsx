import React from 'react';
import { shallow } from 'enzyme';

import App from 'packs/components/App';

describe('<App />', () => {
    it('renders an App', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).not.toBeEmptyRender();
    });
});
