import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "./styles.module.css";

const defaultValues = {
  name: "",
  performers: "",
  date: "",
  time: "",
  address: "",
  venue: "",
  description: "",
};

export default function AddEventPage() {
  const [values, setValues] = useState(defaultValues);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((value) => value === "");

    if (hasEmptyFields) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${API_URL}events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong while adding the new event. :(");
      return;
    }

    const { slug } = await res.json();
    toast.success("Event created successfully");
    router.push(`/events/${slug}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">
        <a>{"<"} Go back</a>
      </Link>
      <h1>Add New Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
      <ToastContainer position="bottom-right" pauseOnHover />
    </Layout>
  );
}
