import React from 'react';

function UserProfilePage(props: any) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Kneeco',
    },
  };
}
