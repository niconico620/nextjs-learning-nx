import fs from 'fs/promises';
import path from 'path';
import React, { Fragment } from 'react';

function ProductDetails(props: any) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h2>{loadedProduct.title}</h2>
      <h2>{loadedProduct.description}</h2>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(
    process.cwd(),
    'apps',
    'site',
    'data',
    'dummy-backend.json'
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  console.log(pathsWithParams);

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetails;
