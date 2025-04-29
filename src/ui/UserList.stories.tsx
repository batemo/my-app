import React from 'react';
import { UserList } from './UserList';
import { UserResult } from '../types/user.types';

export default {
  title: 'UI/UserList',
  component: UserList,
};

const mockUsers: UserResult[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

export const Loading = () => <UserList users={[]} loading />;
export const Error = () => <UserList users={[]} error="Failed to load users" />;
export const Empty = () => <UserList users={[]} />;
export const Populated = () => <UserList users={mockUsers} />; 