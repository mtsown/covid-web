import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthRoute from 'components/AuthRoute/AuthRoute.js';
import Login from 'pages/Login/Login.js';

describe('AuthRoute', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AuthRoute />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = shallow(<AuthRoute path="/login" component={Login} />);
    expect(wrapper).toMatchSnapshot();
  });
});
