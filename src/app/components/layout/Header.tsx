import Form from '@/components/Search/Form';
import * as React from 'react';

interface IHeaderProps {
  title: string;
}

type AllProps = IHeaderProps;

const Header: React.SFC<AllProps> = ({ title }) => (
  <div className="flex flex-col items-center px-8 py-2 bg-grey-lightest border-b">
    <div className="flex flex-col justify-between cursor-pointer w-full">
      <h1 className="mr-4 text-sm text-grey pb-2">Tweet Factory - {title}</h1>
      <Form />
    </div>
  </div>
);

export default Header;
