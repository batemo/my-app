import React, { useState } from 'react';
import { UserRole, UserResult } from '../types/user.types';
import { colors, spacing, typography } from './tokens';
import { Flex } from './layout';

interface UserFormProps {
  initialValues?: Partial<UserResult>;
  onSubmit: (values: { email: string; password?: string; role: UserRole }) => void;
  loading?: boolean;
  error?: string;
  isEdit?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialValues = {},
  onSubmit,
  loading,
  error,
  isEdit = false,
}) => {
  const [email, setEmail] = useState(initialValues.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(initialValues.role || 'user');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || (!isEdit && !password)) return;
    onSubmit({ email, password: isEdit ? undefined : password, role });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: colors.surface, borderRadius: 8, padding: spacing.lg, minWidth: 320 }}>
      <Flex direction="column" gap="md">
        <label style={{ color: colors.text, fontWeight: typography.fontWeight.medium }}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: spacing.sm, border: `1px solid ${colors.muted}`, borderRadius: 4, marginTop: spacing.xs }}
            required
          />
        </label>
        {!isEdit && (
          <label style={{ color: colors.text, fontWeight: typography.fontWeight.medium }}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: spacing.sm, border: `1px solid ${colors.muted}`, borderRadius: 4, marginTop: spacing.xs }}
              required
              minLength={8}
            />
          </label>
        )}
        <label style={{ color: colors.text, fontWeight: typography.fontWeight.medium }}>
          Role
          <select
            value={role}
            onChange={e => setRole(e.target.value as UserRole)}
            style={{ width: '100%', padding: spacing.sm, border: `1px solid ${colors.muted}`, borderRadius: 4, marginTop: spacing.xs }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {touched && !email && <div style={{ color: colors.error }}>Email is required.</div>}
        {touched && !isEdit && !password && <div style={{ color: colors.error }}>Password is required.</div>}
        {error && <div style={{ color: colors.error }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: colors.primary,
            color: '#fff',
            padding: spacing.sm,
            border: 'none',
            borderRadius: 4,
            fontWeight: typography.fontWeight.bold,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
        </button>
      </Flex>
    </form>
  );
}; 