import { EventType } from '@nextjs-learning/core-web/types';
import React from 'react';
import EventItem from '../EventItem';

import * as S from './styles';

type Props = {
  events: EventType[];
};

export function EventList(props: Props) {
  const { events } = props;

  return (
    <S.List>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </S.List>
  );
}
