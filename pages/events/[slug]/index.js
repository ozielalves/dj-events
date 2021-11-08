import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";

import styles from "./styles.module.css";

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}events?slug=${slug}`);

  const [event] = await res.json();

  return {
    props: {
      event: event,
    },
  };
}

/* export async function getStaticPaths() {
  const res = await fetch(`${API_URL}events`);
  const events = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    //revalidate: 1, // When data changes checks for updates every 1 second
    fallback: false, // Show 404 if the data isn't found
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}events?slug=${slug}`);

  const [event] = await res.json();

  return {
    props: {
      event: event,
    },
  };
} */

export default function EventPage({ event }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <div className={styles.image}>
          <Image
            src={
              event.image
                ? event.image.formats.medium.url
                : "/images/event-default.png"
            }
            width={960}
            height={600}
            alt={event.name || "No image"}
          />
        </div>
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue:</h3>
        <p>{event.address}</p>

        <EventMap event={event} />

        <Link href="/events">
          <a className={styles.back}>{"<"} Go back</a>
        </Link>
      </div>
    </Layout>
  );
}
