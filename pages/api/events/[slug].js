const { events } = require("./data.json");

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);

    return;
  }
  const event = events.filter((event) => event.slug === req.query.slug);

  res.status(200).json(event);
}
