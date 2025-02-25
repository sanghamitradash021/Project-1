// // import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import axios from 'axios';
// // import CreateRecipeModal from './CreateRecipeModal';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('CreateRecipeModal', () => {
//   const mockOnClose = jest.fn();
//   const mockOnSuccess = jest.fn();

//   beforeEach(() => {
//     mockedAxios.post.mockClear();
//   });

//   it('renders correctly when open', () => {
//     render(
//       <CreateRecipeModal
//         isOpen={true}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );
//     expect(
//       screen.getByText('Create Your Culinary Masterpiece')
//     ).toBeInTheDocument();
//   });

//   it('does not render when not open', () => {
//     const { container } = render(
//       <CreateRecipeModal
//         isOpen={false}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );
//     expect(container.firstChild).toBeNull();
//   });

//   it('handles input changes', () => {
//     render(
//       <CreateRecipeModal
//         isOpen={true}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );
//     const titleInput = screen.getByPlaceholderText('E.g., vegetable soup');
//     fireEvent.change(titleInput, { target: { value: 'Test Recipe' } });
//     expect(titleInput).toHaveValue('Test Recipe');
//   });

//   it('calls onClose when cancel button is clicked', () => {
//     render(
//       <CreateRecipeModal
//         isOpen={true}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );
//     fireEvent.click(screen.getByText('Cancel'));
//     expect(mockOnClose).toHaveBeenCalledTimes(1);
//   });

//   it('submits the form successfully', async () => {
//     mockedAxios.post.mockResolvedValue({ data: {} });
//     sessionStorage.setItem('token', JSON.stringify({ id: 'user123' }));

//     render(
//       <CreateRecipeModal
//         isOpen={true}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );

//     fireEvent.change(screen.getByPlaceholderText('E.g., vegetable soup'), {
//       target: { value: 'Test Recipe' },
//     });
//     fireEvent.click(screen.getByText('Create Recipe'));

//     await waitFor(() => {
//       expect(mockedAxios.post).toHaveBeenCalled();
//       expect(mockOnSuccess).toHaveBeenCalledTimes(1);
//       expect(mockOnClose).toHaveBeenCalledTimes(1);
//     });
//   });

//   it('handles API error on form submission', async () => {
//     mockedAxios.post.mockRejectedValue(new Error('Failed to create recipe'));
//     sessionStorage.setItem('token', JSON.stringify({ id: 'user123' }));

//     render(
//       <CreateRecipeModal
//         isOpen={true}
//         onClose={mockOnClose}
//         onSuccess={mockOnSuccess}
//       />
//     );
//     fireEvent.change(screen.getByPlaceholderText('E.g., vegetable soup'), {
//       target: { value: 'Test Recipe' },
//     });
//     fireEvent.click(screen.getByText('Create Recipe'));

//     await waitFor(() => {
//       expect(
//         screen.getByText('Failed to create recipe. Please try again.')
//       ).toBeInTheDocument();
//     });
//   });
// });
