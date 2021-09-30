import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {generatePassword} from "./password";
import {draw} from "./lottery";
import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
    ReactTestUtils.
});

describe('method generatePassword', () => {
    it('returns a generated password of lower-case characters and numbers with the length of 8', (done) => {
        let password = generatePassword();
        expect(password).toMatch(/^[a-z0-9]{8}$/)
        done()
    })
})

describe('method draw', () => {
    it('returns lottery numbers', (done) => {
        let numbers = draw(1,49,6);
        expect(numbers.length).toBe(6)
        done()
    })
})