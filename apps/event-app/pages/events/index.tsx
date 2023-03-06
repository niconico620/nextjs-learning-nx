import { getAllEvents } from '../api/dummy-data';
import Head from 'next/head';
import {
  EventList,
  EventsSearch,
  Layout,
} from '@nextjs-learning/core-web/components';

import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

function AllEvents(props: any) {
  const { events } = props;
  const router = useRouter();

  function searchEventsHandler(year: any, month: any) {
    const fullPath = `/events/${year}/${month}`;

    router.push({
      pathname: fullPath,
      query: { filteredYear: year, filteredMonth: month },
    });
  }

  return (
    <Fragment>
      <Head>
        <title>Bebu Dates - All</title>
        <meta
          name="description"
          content="A collection of all my existing dates with my bebu."
        />
      </Head>
      <EventsSearch onSearch={searchEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default AllEvents;
