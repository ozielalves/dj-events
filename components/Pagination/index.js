import Link from "next/link";
import { EVENTS_PER_PAGE } from "@/config/index";

export default function Pagination({ page, total, route = "events" }) {
  const lastPage = Math.ceil(total / EVENTS_PER_PAGE);

  return (
    <>
      {page > 1 && (
        <Link href={`/${route}?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/${route}?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
