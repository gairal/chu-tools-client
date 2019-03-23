import * as React from 'react';

interface IHeaderProps {
  title: string;
}

type AllProps = IHeaderProps;

const Header: React.SFC<AllProps> = ({ title }) => (
  <div className="fixed pin-t pin-l pin-r flex flex-col items-center px-16 bg-grey-lightest border-b">
    <div className="flex justify-between items-center cursor-pointer w-full min-h-12">
      <h1 className="mr-4">Tweet Factory - {title}</h1>
    </div>
  </div>
);

export default Header;
