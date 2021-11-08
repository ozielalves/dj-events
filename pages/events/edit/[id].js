import { useState } from "react";
import { useRouter } from "next/router";
import { FaImage } from "react-icons/fa";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@/config/index";
import { useToaster } from "@/hooks/useToaster";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "@/helpers/index";
import styles from "./styles.module.css";

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}events/${id}`);
  const event = await res.json(); // get event from api

  return {
    props: {
      event,
      token,
    },
  };
}

export default function EditEventPage({ event, token }) {
  const [values, setValues] = useState(event);
  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const toast = useToaster();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((value) => value === "");

    if (hasEmptyFields) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch(`${API_URL}events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        toast.error("You are not authorized to perform this action");
        return;
      }
      toast.error("Something went wrong while editing the new event. :(");
      return;
    }

    const { slug } = await res.json();
    toast.success("Event edited successfully");
    router.push(`/events/${slug}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageUpload = async (e) => {
    const res = await fetch(`${API_URL}events/${event.id}`);
    const { image } = await res.json();

    setImagePreview(image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">
        <a>{"<"} Go back</a>
      </Link>
      <h1>Edit Event {}</h1>

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
              value={moment(values.date).format("YYYY-MM-DD")}
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

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt={event.name} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          onImageUpload={handleImageUpload}
          token={token}
        />
      </Modal>
    </Layout>
  );
}
