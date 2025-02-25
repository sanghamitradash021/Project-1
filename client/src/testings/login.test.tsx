import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';

// ✅ Mock useAuth properly
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// ✅ Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// ✅ Mock lucide-react icons (if needed)
jest.mock('lucide-react', () => ({
  Mail: () => <svg data-testid="mail-icon" />,
  Lock: () => <svg data-testid="lock-icon" />,
}));

describe('Login Page', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // ✅ Ensure useAuth() always returns an object
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
  });

  test('renders login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Using getByAltText as requested
    expect(screen.getByAltText(/email input/i)).toBeInTheDocument();
    expect(screen.getByAltText(/password input/i)).toBeInTheDocument();
  });

  test('calls login function on form submit', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByAltText(/email input/i);
    const passwordInput = screen.getByAltText(/password input/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('displays error message on invalid login', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockRejectedValue(new Error('Invalid credentials')),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByAltText(/email input/i);
    const passwordInput = screen.getByAltText(/password input/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(screen.findByText(/invalid credentials/i)).toBeTruthy();
  });
});
