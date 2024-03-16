import React from "react";
import { Button, HStack } from "@chakra-ui/react";
const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  return (
    <div className="pagination">
      <HStack spacing={6}>
        <Button
          className="btn"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
          bg={"white"}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          className="btn"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          bg={"white"}
        >
          Next
        </Button>
      </HStack>
    </div>
  );
};

export default Pagination;
