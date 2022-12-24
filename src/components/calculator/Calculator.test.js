import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Calculator from './Calculator'

test('renders a number input with a label "Average income" and "Days on sick-leave"', () => {
    const div = document.createElement('div')
    render(<Calculator />, div)
    const input1 = screen.getByLabelText(/income/i)
    const input2 = screen.getByLabelText(/leave/i)
    expect(input1).toHaveAttribute('type', 'number')
    expect(input2).toHaveAttribute('type', 'number')
})

