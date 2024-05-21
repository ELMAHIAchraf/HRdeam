
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CalendarPages } from "./CalendarPages";


export const CalendarPagination = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const now = new Date();
    const monthLength=new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const totalPages = monthLength;

    const [isOpen, setIsOpen] = useState(false);


    const handleClick = (page) => {
        setCurrentPage(page);
        handlePaginationClickScroll(page);
    }



    const state = useSelector((state) => state.absence);
    const employees = useMemo(() => state.employees ? state.employees.data : [], [state]);

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

    const scrollBarDiv=useRef()
    const awayDivScroll = Array(employees.length).fill().map(() => React.createRef());

    const handleScroll = (direction) => {
        scrollBarDiv.current.scrollBy({ left: direction === "->" ? 40 : -40, behavior: 'smooth' });
        for(let i=0;i<awayDivScroll.length;i++){
            awayDivScroll[i].current.scrollBy({ left: direction === "->" ? 40 : -40, behavior: 'smooth' });
        }
    }

    const handlePaginationClickScroll=(index)=>{
        const scroll = index-currentPage;
            scrollBarDiv.current.scrollBy({ left: 40*scroll, behavior: 'smooth' });
            for(let i=0;i<awayDivScroll.length;i++){
                awayDivScroll[i].current.scrollBy({ left: 40*scroll, behavior: 'smooth' });
            }
        }     
    

    function getWeekends(year, month) {
        const weekends = [];    
        for (let day = 1; day <= monthLength; day++) {
            const dayOfWeek = new Date(year, month, day).getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) { 
                weekends.push(day);
            }
        }
        return weekends;
    }
    
    const generateDiv = (id, employeeID)=>{
        const div=[]
        for(let i=1;i<=monthLength;i++){
            if(getWeekends(now.getFullYear(), now.getMonth()).includes(i)){
                div.push(<div key={`dayDiv${i}`} className="w-[40px] h-full flex-none bg-gray-200 text-center"></div>)
            }else{
                div.push(<div key={`dayDiv${i}`} className={`w-[40px] flex-none`}></div>)
            }
        }
        employees[id].absences.forEach(abs=>{
            let width = 40*(new Date(abs.end_date).getDate() - new Date(abs.start_date).getDate()+1);
            let leftMargin = 40*(new Date(abs.start_date).getDate()-1);
            div.push(
            <div>

            <div onClick={()=>{setIsOpen(true)}} key={abs.id} style={{width : width+"px", position : "absolute", top : "25px", left: leftMargin+"px"}} className="cursor-pointer bg-[#ffd0d0] flex-none h-8 rounded-lg flex items-center">
                <p className="text-[#b34949] ml-2 text-sm font-semibold">Away</p>    
            </div>
            <div className={`${isOpen==false?'hidden' : "flex"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-[#0000005e]`} >
                <div className="relative p-4 w-full max-w-2xl max-h-2xl">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attachment</h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>setIsOpen(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                </div>
                        <div className="p-4 md:p-5">
                            <iframe src={`http://127.0.0.1:8000/storage/Attachments/${employeeID}.pdf#zoom=50`} width="600px" height="610px"  className="rounded-lg"/>
                        </div>
                    </div>
                </div>
            </div> 
            </div>
            
        )
        })
        return div;
    }
    const generateParentDiv = ()=>{
        const div=[]
        for(let i=1;i<=employees.length;i++){
            div.push(<div key={`employee${i}`} className="h-[81.5px] w-[920px] relative  border-b-[1px] bg-[#fafafa] flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide" ref={awayDivScroll[i-1]} >{generateDiv(i-1, employees[i-1].id)}</div>)
        }
        return div;
    }

  return (
    <div className="flex flex-col">

        <div className="w-95 ml-8  border-[#e5e5e5] border-t-[1px] border-b-[1px] flex items-center py-2">
            <p className="font-bold">{ new Date().toLocaleString('default', { month: 'long' })}</p>
            <Pagination className="ml-12">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => {handleClick(currentPage - 1); handleScroll("<-")}} disabled={currentPage === 1} />
                            </PaginationItem>
                            <div ref={scrollBarDiv} className="flex w-[920px] overflow-x-auto overflow-y-hidden scrollbar-hide">
                                {createPaginationItems()}
                            </div>
                            <PaginationItem>
                        <PaginationNext onClick={() => {handleClick(currentPage + 1); handleScroll("->")}} disabled={currentPage === totalPages} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
        
        <div className="flex h-[410px]">
            <div>
                {
                    employees.map((employee) => (
                        <div className="flex items-center w-[180px] mt-[1px] ml-8 py-4 border-b-[1px]" key={employee.id}>
                            <img className="w-12 h-12 rounded-full" src={`http://127.0.0.1:8000/storage/Avatars/${employee.id}.jpg`} alt=""/>
                            <div className="ml-3">
                                <div className="w-[110px]"><p className="font-bold truncate">{employee.fname} {employee.lname}</p></div>
                                <div className="w-[110px]"><p className="font-light text-xs truncate">{employee.position}</p></div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {generateParentDiv()}
            </div>
        </div>
        <div className="mt-4">
            <CalendarPages />
        </div>
    </div>
  )
}
  