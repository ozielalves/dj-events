export default function EventPage() {
  return (
    <div>
      <span>
        {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
      </span>
    </div>
  );
}
