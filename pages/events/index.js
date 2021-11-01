import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, EVENTS_PER_PAGE } from "@/config/index";

// Run on server side (first)
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * EVENTS_PER_PAGE;

  // Fetch events from Scrapi API
  const totalRes = await fetch(`${API_URL}events/count`);

  const total = await totalRes.json();

  // Fetch events from Scrapi API
  const res = await fetch(
    `${API_URL}events?_sort=date:ASC&_limit=${EVENTS_PER_PAGE}&_start=${start}`
  );

  const events = await res.json();

  return {
    props: { events, page: +page, total },
    /* revalidate: 1, */ // If the data changes, it will check for new data every second
  };
}

// Gets events from server before rendering
export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <p>No events found</p>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}
