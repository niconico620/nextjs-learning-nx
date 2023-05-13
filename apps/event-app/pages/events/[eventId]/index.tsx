/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '@dummy-data';
import Head from 'next/head';
import {
  EventSummary,
  EventLogistics,
  EventContent,
  Comments,
} from '@nextjs-learning/core-web/components';
import { EventType } from '@nextjs-learning/core-web/types';

type Props = {
  event: EventType;
};

function EventDetails(props: Props) {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const featuredEvent = await getEventById(eventId);

  return {
    props: {
      event: featuredEvent,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetails;
