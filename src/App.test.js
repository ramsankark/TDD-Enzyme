import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import enzyme, { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/*
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
*/

configure({ adapter: new Adapter() });

const setup = (props={}, state=null) => {
  return shallow(<App {...props} />)
}

const testByAttr = (wrapper,value) => {
  return wrapper.find(`[data-test='${value}']`);
}

test('renders App component properly', () => {
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
})

test('renders result element', () => {
  const wrapper = setup();
  const displayCount = testByAttr(wrapper,'counter-display')
  expect(displayCount.length).toBe(1);
})

test('check Inital state count is 0', () => {
  const wrapper = setup();
  const initialCount = wrapper.state('counter');
  expect(initialCount).toBe(0);
})

test('check value increment on click', () => {
  const counter = 10;
  const wrapper = setup();
  wrapper.setState({counter});
  const iButton = testByAttr(wrapper,'increment-button');
  iButton.simulate('click');
  wrapper.update();

  const display = testByAttr(wrapper,'counter-display');
  expect(display.text()).toContain(counter + 1);
})

test('check value decrement on click', () => {
  const counter = 10;
  const wrapper = setup();
  wrapper.setState({counter});
  const dButton = testByAttr(wrapper,'decrement-button');
  dButton.simulate('click');
  wrapper.update();

  const display = testByAttr(wrapper,'counter-display');
  expect(display.text()).toContain(counter - 1);
})

test('value cannot be negative', () => {
  const wrapper = setup();
  const dButton = testByAttr(wrapper,'decrement-button');
  dButton.simulate('click');
  wrapper.update();

  const displayCount = wrapper.state('counter');
  expect(displayCount).not.toBeLessThan(0);
})

test('display error message', ()=>{
  const wrapper = setup();
  const dButton = testByAttr(wrapper,'decrement-button');
  dButton.simulate('click');
  wrapper.update();

  const displayError = testByAttr(wrapper,'error-message');
  expect(displayError).toBeTruthy();
})

test('disable error message on increment', ()=>{
  const wrapper = setup();
  wrapper.setState({error: true});
  const iButton = testByAttr(wrapper,'increment-button');
  iButton.simulate('click');
  wrapper.update();

  const displayError = testByAttr(wrapper,'error-message');
  expect(displayError.length).toBe(0);
})