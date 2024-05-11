import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";

function SimplePagination({ func, data, className }) {
  const { currentPage, hasPrevPage, hasNextPage, totalPages } = data.pagination;
  const { next, prev } = func;

  return (
    <div className={`${className} flex items-center gap-8`}>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={!hasPrevPage}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={!hasNextPage}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

export default SimplePagination;
