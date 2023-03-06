import React, { Fragment } from 'react';
import MainHeader from '../MainHeader';

export function Layout(props: any) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}
