import { axiosInstance } from "@/Axios";
import { SetAbsence } from "@/State/absenceSlice";
import { initializeCount } from "@/State/countSlice";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CalendarPages = () => {

    const getCount = async()=>{
        try {
            const response = await axiosInstance.get('/count', {timeout: 5000})
            dispatch(initializeCount(response.data.data))   
        } catch (error) {
            console.error(error);
        }
        }
        useEffect(() => {
            getCount()
            fetchAbsData(1);
        }, [])

    const count = useSelector((state) => state.count.count);
    const [currentAbsPage, setCurrentAbsPage] = useState(1);
    const totalAbsPages = Math.ceil(count / 5);
    
    const handleClickAbs = (page) => {
        setCurrentAbsPage(page);
        fetchAbsData(page);
    }

    const createPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalAbsPages; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink href="#" onClick={() => handleClickAbs(i)} isActive={currentAbsPage === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return items;
    }
    const dispatch = useDispatch();
    const fetchAbsData = async (page) => {
        try {
            const response = await axiosInstance.get(`absences?page=${page}`, {timeout: 5000});
            dispatch(SetAbsence(response.data.data.data));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
  return (
    <>
         <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handleClickAbs(currentAbsPage - 1)} disabled={currentAbsPage === 1} />
                </PaginationItem>
                    {createPaginationItems()}
                <PaginationItem>
                    <PaginationNext onClick={() => handleClickAbs(currentAbsPage + 1)} disabled={currentAbsPage === totalAbsPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </>
  )
}
  