import React from 'react';
import { UserForm } from './UserForm';
import { UserRole } from '../types/user.types';

export default {
  title: 'UI/UserForm',
  component: UserForm,
};

const mockOnSubmit = (values: any) => {
  alert('Submitted: ' + JSON.stringify(values, null, 2));
};

export const Create = () => (
  <UserForm onSubmit={mockOnSubmit} />
);

export const Edit = () => (
  <UserForm
    isEdit
    initialValues={{
      email: 'user@example.com',
      role: 'user' as UserRole,
    }}
    onSubmit={mockOnSubmit}
  />
);

export const Loading = () => (
  <UserForm onSubmit={mockOnSubmit} loading />
);

export const Error = () => (
  <UserForm onSubmit={mockOnSubmit} error="Failed to save user" />
); 