import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import './index.scss';

render(<App initialCount={10} />, document.getElementById('root'));
