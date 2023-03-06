/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import Head from 'next/head';
import { getFeaturedEvents } from '@dummy-data';
import { EventList, Layout } from '@nextjs-learning/core-web/components';
import React from 'react-dom';

export type Props = {
  events: {
    id: string;
    date: string;
    description: string;
    image: string;
    isFeatured: boolean;
    location: string;
    title: string;
  }[];
};

export default function Home(props: Props) {
  const { events } = props;

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Bebu Dates - Featured</title>
        <meta
          name="description"
          content="A collection of upcoming dates with my bebu."
        />
      </Head>
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 120,
  };
}
