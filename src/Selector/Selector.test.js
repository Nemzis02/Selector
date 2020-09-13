/* eslint-disable no-undef */
import React from 'react';
import Selector from './Selector';
import { testValues } from './testValues';

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

describe('Selector', () => {
  const randomOptionIndex = randomInteger(0, testValues.length - 1);

  test('Must render', () => {
    const wrapper = shallow(<Selector options={testValues} />);
    expect(wrapper.find('#selector')).toHaveLength(1);
  });

  test('Must not render if options are undefined', () => {
    const wrapper = shallow(<Selector />);
    expect(wrapper.find('#selector')).toHaveLength(0);
  });

  test('Must have an initial value when it is defined', () => {
    const wrapper = shallow(
      <Selector
        initialValue={testValues[randomOptionIndex]}
        options={testValues}
      />
    );
    expect(wrapper.find('#selector > span').text()).toEqual(
      testValues[randomOptionIndex].text
    );
  });

  test('Must not have an initial value when it is undefined', () => {
    const wrapper = shallow(<Selector options={testValues} />);
    expect(wrapper.find('#value').length).toEqual(0);
  });

  test('Must have a label when it is defined', () => {
    const label = 'Label';
    const wrapper = shallow(<Selector label={label} options={testValues} />);
    expect(wrapper.find('#label').text()).toEqual(label);
  });

  test('Must not have a label when it is undefined', () => {
    const wrapper = shallow(<Selector options={testValues} />);
    expect(wrapper.find('#label')).toHaveLength(0);
  });

  test('Must render a drop down with options passed via props when the component is clicked', () => {
    const wrapper = shallow(<Selector options={testValues} />);
    wrapper.find('#selector').simulate('click');
    wrapper.find('li').forEach((li, index) => {
      expect(li.text()).toEqual(testValues[index].text);
    });
  });

  test('Must render a value when an option selected', () => {
    const wrapper = shallow(<Selector options={testValues} />);
    wrapper.find('#selector').simulate('click');
    wrapper.find('ul').childAt(randomOptionIndex).simulate('click');
    expect(wrapper.find('#value').text()).toEqual(
      testValues[randomOptionIndex].text
    );
  });

  test('Must render a placeholder if an initial value is undefined and a placeholder is defined', () => {
    const placeholder = 'Placeholder...';
    const wrapper = shallow(
      <Selector options={testValues} placeholder={placeholder} />
    );

    expect(wrapper.find('#placeholder').text()).toEqual(placeholder);
  });
});
