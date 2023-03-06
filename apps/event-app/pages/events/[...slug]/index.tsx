import { getFilteredEvents } from '../../api/dummy-data';
import Head from 'next/head';
import {
  Button,
  EventList,
  ResultsTitle,
} from '@nextjs-learning/core-web/components';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

function FilteredEvents(props: any) {
  const { filteredEvents, date, hasError, hasNoEvents, isLoading } = props;

  let pageHeadData = (
    <Head>
      <title>Bebu Dates - Filtered</title>
      <meta name="description" content={`A list of filtered dates.`} />
    </Head>
  );

  if (isLoading) {
    <>
      {pageHeadData}
      <p className="center">Loading..</p>
    </>;
  }

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <p>Invalid filter. Please adjust your values.</p>
          <Button link="/events">Return</Button>
        </div>
      </Fragment>
    );
  }

  if (hasNoEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <div className="center">
          <p>No events found for the chosen filter!</p>
          <Button link="/events">Return</Button>
        </div>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Bebu Dates - Filtered</title>
      <meta
        name="description"
        content={`All dates for ${date.month}/${date.year}`}
      />
    </Head>
  );

  const newDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={newDate} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const filteredData = query;

  const filteredYear = query.filteredYear;
  const filteredMonth = query.filteredMonth;

  if (!filteredData.slug) {
    return { props: { isLoading: true } };
  }

  //the + converts the string into a number
  if (filteredYear && filteredMonth) {
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2000 ||
      numMonth > 12
    ) {
      return {
        props: { hasError: true },
      };
    }

    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    if (!filteredEvents || filteredEvents.length === 0) {
      return {
        props: { hasNoEvents: true },
      };
    }

    return {
      props: {
        filteredEvents: filteredEvents,
        date: { year: numYear, month: numMonth },
      },
    };
  }
}

export default FilteredEvents;
