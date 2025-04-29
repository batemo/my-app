import React, { useEffect, useState } from 'react';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
import { UserResult, UserRole } from '../types/user.types';
import { Flex, Grid } from './layout';
import { colors, spacing } from './tokens';

const API_URL = '/users';

export const UserManagementContainer: React.FC = () => {
  const [users, setUsers] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [editingUser, setEditingUser] = useState<UserResult | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (values: { email: string; password?: string; role: UserRole }) => {
    setFormLoading(true);
    setFormError(undefined);
    try {
      const res = await fetch(
        editingUser ? `${API_URL}/${editingUser.id}` : API_URL,
        {
          method: editingUser ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) throw new Error('Failed to save user');
      setEditingUser(null);
      fetchUsers();
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (user: UserResult) => {
    setEditingUser(user);
    setFormError(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="lg">
      <h2 style={{ color: colors.primary }}>User Management</h2>
      <UserForm
        key={editingUser?.id || 'create'}
        isEdit={!!editingUser}
        initialValues={editingUser || undefined}
        onSubmit={handleSubmit}
        loading={formLoading}
        error={formError}
      />
      <UserList
        users={users}
        loading={loading}
        error={error}
      />
      <div style={{ marginTop: spacing.md }}>
        <Grid columns={users.length || 1} gap="sm">
          {users.map(user => (
            <Flex key={user.id} gap="sm">
              <button
                style={{ background: colors.secondary, color: '#fff', border: 'none', borderRadius: 4, padding: spacing.xs, cursor: 'pointer' }}
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                style={{ background: colors.error, color: '#fff', border: 'none', borderRadius: 4, padding: spacing.xs, cursor: 'pointer' }}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </Flex>
          ))}
        </Grid>
      </div>
    </Flex>
  );
}; 