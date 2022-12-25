import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Calculator from './Calculator'
import userEvent from "@testing-library/user-event";

test('renders a number input with a label "Average income" and "Days on sick-leave"', () => {
    const div = document.createElement('div')
    render(<Calculator />, div)
    const input1 = screen.getByLabelText(/income/i)
    const input2 = screen.getByLabelText(/leave/i)
    expect(input1).toHaveAttribute('type', 'number')
    expect(input2).toHaveAttribute('type', 'number')
})

describe("Calculator component", () => {

    it("should render Calculator component correctly", () => {
        render(<Calculator />);
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });

    it("should throw error when required fields are not filled", async () => {
        render(<Calculator />);
        const buttonElement = screen.getByRole("button");
        await waitFor(() => {
            userEvent.click(buttonElement);
            const errorMessage1 = screen.getByRole("error1");
            const errorMessage2 = screen.getByRole("error2");
            expect(errorMessage1).toBeInTheDocument();
            expect(errorMessage2).toBeInTheDocument();

        });
    });

});