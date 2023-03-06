/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { EventType } from '@nextjs-learning/core-web/types';
import Link from 'next/link';
import React from 'react';
import { Button } from '../../atoms/Button';
import Card from '../../atoms/Card';
import AddressIcon from '../../icons/address-icon';
import ArrowRightIcon from '../../icons/arrow-right-icon';
import DateIcon from '../../icons/date-icon';
import * as S from './styles';

type Props = {
  event: EventType;
};
function EventItem(props: Props) {
  const { event } = props;

  const humanReadableDate = new Date(event.date).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = event.location?.replace(', ', '\n');
  const exploreLink = `/events/${event.id}`;

  return (
    <S.Item>
      <S.Photo
        src={'/' + event.image}
        alt={event.title}
        width={340}
        height={160}
      />
      <S.Content>
        <div className="summary">
          <h2>{event.title}</h2>
          <div className="date">
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className="address">
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <S.Actions>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <S.IconSpan>
              <ArrowRightIcon />
            </S.IconSpan>
          </Button>
        </S.Actions>
      </S.Content>
    </S.Item>
  );
}

export default EventItem;
