import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import styles from "./styles.module.css";

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return { props: { token, events } };
}

export default function Dashboard({ token, events }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="Dashboard">
      <div className={styles.showcase}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.length === 0 && <p>You don&apos;t have events yet :(</p>}

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}
