import { FC, ReactNode } from 'react';

import { useRedirectUnauthorize } from '@admin/utils/hooks';

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { children } = props;
  //TODO(eastasian) call this again page active
  useRedirectUnauthorize('/auth/signin');

  return <>{children}</>;
};
