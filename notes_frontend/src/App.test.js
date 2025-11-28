import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders custom app header', () => {
  render(<App />);
  // Wait for header to appear
  const headerElement = screen.getByText(/Notes Ocean/i);
  expect(headerElement).toBeInTheDocument();
  const subtitle = screen.getByText(/Professional Notes App/i);
  expect(subtitle).toBeInTheDocument();
});

test('renders sidebar and add note button', () => {
  render(<App />);
  const sidebarElement = screen.getByTestId("sidebar");
  expect(sidebarElement).toBeInTheDocument();
  const addBtn = screen.getByTestId("add-note-button");
  expect(addBtn).toBeInTheDocument();
});

test('renders empty note list', () => {
  render(<App />);
  const notesMsg = screen.getByText(/No notes yet/i);
  expect(notesMsg).toBeInTheDocument();
});

test('add note triggers editor', () => {
  render(<App />);
  const addBtn = screen.getByTestId("add-note-button");
  fireEvent.click(addBtn);
  const editor = screen.getByTestId("note-editor");
  expect(editor).toBeInTheDocument();
  const input = screen.getByTestId("note-content-input");
  expect(input).toBeInTheDocument();
});
