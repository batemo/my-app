import React from 'react';
import { UserResult } from '../types/user.types';
import { colors, spacing, typography } from './tokens';
import { Grid, Flex } from './layout';

interface UserListProps {
  users: UserResult[];
  loading?: boolean;
  error?: string;
}

export const UserList: React.FC<UserListProps> = ({ users, loading, error }) => {
  if (loading) return <div style={{ color: colors.primary }}>Loading users...</div>;
  if (error) return <div style={{ color: colors.error }}>{error}</div>;
  if (!users.length) return <div style={{ color: colors.muted }}>No users found.</div>;

  return (
    <div style={{ background: colors.surface, borderRadius: 8, padding: spacing.lg }}>
      <Grid columns={4} gap="md" style={{ fontWeight: typography.fontWeight.bold, color: colors.text, marginBottom: spacing.md }}>
        <div>ID</div>
        <div>Email</div>
        <div>Role</div>
        <div>Created At</div>
      </Grid>
      {users.map((user) => (
        <Grid columns={4} gap="md" key={user.id} style={{ borderBottom: `1px solid ${colors.muted}`, padding: `${spacing.sm} 0` }}>
          <div>{user.id}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
          <div>{new Date(user.createdAt).toLocaleString()}</div>
        </Grid>
      ))}
    </div>
  );
}; 