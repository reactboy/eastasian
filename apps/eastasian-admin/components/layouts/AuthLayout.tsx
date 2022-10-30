import { FC, ReactNode } from 'react';
import { useRedirectAuthorize } from '@admin/utils/hooks';

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;
  useRedirectAuthorize('/');

  return <>{children}</>;
};
