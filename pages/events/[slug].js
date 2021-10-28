import Layout from "../../components/Layout";

export default function EventPage() {

  return (
    <Layout>
      <span>
        {new Date(/* evt.date */).toLocaleDateString("en-US")} at
        {" today" /* evt.time */}
      </span>
    </Layout>
  );
}
