import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  //   to have only 4 more page buttons show if current page is in the middle (if there are)
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 4, maxPage - 8));

  const numberOfPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberOfPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`btn join-item btn-sm ${
          currentPage == page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }
  return (
    <>
      <div className="join hidden sm:block">{numberOfPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link
            href={"?page=" + (currentPage - 1)}
            className="btn join-item btn-sm"
          >
            «
          </Link>
        )}
        <button className="btn join-item btn-sm pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link
            href={"?page=" + (currentPage + 1)}
            className="btn join-item btn-sm"
          >
            »
          </Link>
        )}
      </div>
    </>
  );
}
