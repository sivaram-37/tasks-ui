import Dropdown from "./dropdown";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pagination = ({
  page,
  pageSize,
  total_record,
  setPage,
  setPageSize,
}: {
  page: number;
  pageSize: number;
  total_record: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}) => {
  const totalPages = Math.ceil(total_record / pageSize);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="text-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <p>
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total_record)} of{" "}
          {total_record} tasks
        </p>
        <Dropdown
          options={[
            { label: "2", value: "2" },
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "25", value: "25" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
          ]}
          value={pageSize.toString()}
          onChange={(value) => setPageSize(parseInt(value))}
          className="w-24 text-sm"
        />
      </div>
      <div>
        <ShadcnPagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {getPageNumbers().map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setPage(pageNum as number)}
                    isActive={page === pageNum}
                    className="cursor-pointer">
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      </div>
    </div>
  );
};

export default Pagination;
