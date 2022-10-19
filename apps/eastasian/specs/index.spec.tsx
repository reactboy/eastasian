import React from 'react';
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@resume/redux/app';
import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ReduxProvider store={store}>
        <Index />
      </ReduxProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
