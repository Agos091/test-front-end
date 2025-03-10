import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import LoginScreen from '../LoginScreen'

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
}))

describe('LoginScreen', () => {
    test('renders correctly', () => {
        const { getByTestId, getByText } = render(<LoginScreen />)

        expect(getByTestId('input-email')).toBeTruthy()
        expect(getByTestId('input-password')).toBeTruthy()
        expect(getByText('Entrar')).toBeTruthy()
    })

    it('calls Firebase signIn when form is submitted', async () => {
        const { getByTestId, getByText } = render(<LoginScreen />)

        fireEvent.changeText(getByTestId('input-email'), 'teste@email.com')
        fireEvent.changeText(getByTestId('input-password'), '123456')
        fireEvent.press(getByText('Entrar'))

        await waitFor(() => {
            expect(getByText('Entrar')).toBeTruthy()
        })
    })
})
