export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-9401c-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key]
    });
  }

  return transformedEvents;
}

export async function getFilteredEvents(dateFilter: any) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id: any) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}