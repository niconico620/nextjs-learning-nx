import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
import styles from './index.module.css';

export function HomePage(props: any) {
  const { products } = props;

  return (
    <div className={styles.page}>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

//prefetch the data before this component is created/prerendered by nextjs
export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    'apps',
    'site',
    'data',
    'dummy-backend.json'
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
