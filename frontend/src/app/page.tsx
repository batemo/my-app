import React from 'react';
import { UserManagementContainer } from '../ui/UserManagementContainer';
import { Flex } from '../ui/layout';
import { colors } from '../ui/tokens';

export default function Page() {
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: '100vh', background: colors.background }}>
      <UserManagementContainer />
    </Flex>
  );
}
