import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Timr from '../../app/components/Timr';

configure({adapter: new Adapter()});

describe.skip('Timr Component', () => {

  it('should correctly render without initial seek property', () => {
    const wrapper = shallow(<Timr />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.timr')).toBeTruthy();
  });

  it('should correctly render with initial seek property set', () => {
    const wrapper = shallow(<Timr seek={1234}/>);
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.timr')).toBeTruthy();
  });


  it('should correctly update on property update', (done) => {
    const seek = 1000;
    const wrapper = shallow(<Timr seek={seek}/>);
    expect(wrapper.find('.timr').text()).toContain('00:01');

    setTimeout(() => {
      wrapper.setProps({seek: 1});
      expect(wrapper.find('.timr').text()).toContain('00:00');
      done();
    }, 2000);


  });


});
