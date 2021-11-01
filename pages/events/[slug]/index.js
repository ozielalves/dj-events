import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@/config/index";
import { useToaster } from "@/hooks/useToaster";
import Layout from "@/components/Layout";

import styles from "./styles.module.css";

/* export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}events/${slug}`);

  const [event] = await res.json();

  return {
    props: {
      event: event,
    },
  };
} */

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}events`);
  const events = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    /* revalidate: 1, // When data changes checks for updates every 1 second */
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
}

export default function EventPage({ event }) {
  const router = useRouter();

  const toast = useToaster();

  const deleteEvent = async () => {
    if (confirm("Are you sure")) {
      await fetch(`${API_URL}events/${event.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Event deleted successfully");
            router.push("/events");
          } else {
            toast.error("Event could not be deleted");
          }
        })
        .catch((err) => {
          toast.error("Event could not be deleted");
        });
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

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

        <Link href="/events">
          <a className={styles.back}>{"<"} Go back</a>
        </Link>
      </div>
    </Layout>
  );
}