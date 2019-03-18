import IndexPage from '@/pages';
import AuthPage from '@/pages/auth';

interface INavLinkProps {
  exact?: boolean;
  to: string;
}

interface IRouteProps {
  component: React.FunctionComponent;
  exact?: boolean;
  path: string;
}

interface IRouteConf {
  inNav?: boolean;
  label: string;
  navLinkProps: INavLinkProps;
  private?: boolean;
  props: IRouteProps;
}

const routes: IRouteConf[] = [
  {
    inNav: false,
    label: 'login',
    navLinkProps: {
      to: '/auth',
    },
    private: false,
    props: {
      component: AuthPage,
      exact: true,
      path: '/auth',
    },
  },
  {
    inNav: true,
    label: 'search',
    navLinkProps: {
      to: '/',
    },
    private: true,
    props: {
      component: IndexPage,
      exact: true,
      path: '/',
    },
  },
];

export default routes;
