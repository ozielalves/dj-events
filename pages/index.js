import Link from "next/link";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

// Run on server side (first)
export async function getStaticProps() {
  const res = await fetch(`${API_URL}events?_sort=date:ASC&_limit=3`);

  const events = await res.json();
  return {
    props: { events },
    revalidate: 1, // If the data changes, it will check for new data every second
  };
}

// Gets events from server before rendering
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <p>No events found</p>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}
