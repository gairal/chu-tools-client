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
  isPrivate?: boolean;
  props: IRouteProps;
}

const routes: IRouteConf[] = [
  {
    inNav: false,
    isPrivate: false,
    label: 'login',
    navLinkProps: {
      to: '/auth',
    },
    props: {
      component: AuthPage,
      exact: true,
      path: '/auth',
    },
  },
  {
    inNav: true,
    isPrivate: true,
    label: 'search',
    navLinkProps: {
      to: '/',
    },
    props: {
      component: IndexPage,
      exact: true,
      path: '/',
    },
  },
  {
    inNav: true,
    isPrivate: true,
    label: 'posts',
    navLinkProps: {
      to: '/posts',
    },
    props: {
      component: IndexPage,
      exact: true,
      path: '/posts',
    },
  },
];

export default routes;
