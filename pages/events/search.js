import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

// Run on server side (first)
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { performers_contains: term },
        { venue_contains: term },
      ],
    },
  });

  console.log(query); // PRINT

  const res = await fetch(`${API_URL}events?${query}&_sort=date:ASC`);

  const events = await res.json();

  return {
    props: { events },
    /* revalidate: 1,  */ // If the data changes, it will check for new data every second
    // Only when using getStaticProps
  };
}

// Gets events from server before rendering
export default function SearchPage({ events }) {
  const {
    query: { term },
  } = useRouter();

  return (
    <Layout>
      <h1>Search results for {term}</h1>
      <Link href="/events">
        <a>{"<"} Go back</a>
      </Link>
      {events.length === 0 && <p>No events found</p>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}
