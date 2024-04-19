import { axiosInstance } from "@/Axios";
import { setEmployee } from "@/State/EmployeeSlice";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EmployeePagination = () => {

    const count = useSelector((state) => state.count.count);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(count / 6);
    
    const handleClick = (page) => {
        setCurrentPage(page);
        fetchData(page);
    }

    const createPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink href="#" onClick={() => handleClick(i)} isActive={currentPage === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return items;
    }
    const dispatch = useDispatch();
    const fetchData = async (page) => {
        try {
            const response = await axiosInstance.get(`employees?page=${page}`);
            dispatch(setEmployee(response.data.data.employees.data));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
  return (
    <>
         <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />
                </PaginationItem>
                {createPaginationItems()}
                <PaginationItem>
                    <PaginationNext onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </>
  )
}
  