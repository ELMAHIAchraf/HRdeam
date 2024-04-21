
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CalendarPages } from "./CalendarPages";

export const CalendarPagination = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const now = new Date();
    const monthLength=new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const totalPages = monthLength;

    const handleClick = (page) => {
        setCurrentPage(page);
        handlePaginationClickScroll(page);
    }

    const employees = useSelector((state) => state.absence);

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
    
    const generateDiv = (id)=>{

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
            div.push(<div key={abs.id} style={{width : width+"px", position : "absolute", top : "25px", left: leftMargin+"px"}} className={`bg-[#ffd0d0] flex-none h-8 rounded-lg flex items-center`}><p className="text-[#b34949] ml-2 text-sm font-semibold">Away</p></div>)
        })
        return div;
    }
    const generateParentDiv = ()=>{
        const div=[]
        for(let i=1;i<=employees.length;i++){
            div.push(<div key={`employee${i}`} className="h-[81.5px] w-[920px] relative  border-b-2 bg-[#fafafa] flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide" ref={awayDivScroll[i-1]} >{generateDiv(i-1)}</div>)
        }
        return div;
    }

  return (
    <div className="flex flex-col">

        <div className="w-95 ml-8  border-[#e5e5e5] border-t-2 border-b-2 flex items-center py-2">
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
        
        <div className="flex">
            <div>
                {
                    employees.map((employee) => (
                        <div className="flex items-center w-[180px] ml-8 py-4 border-b-2" key={employee.id}>
                            <img className="w-12 h-12 rounded-full" src={`http://127.0.0.1:8000/storage/Avatars/${employee.id}.jpg`} alt=""/>
                            <div className="ml-3">
                                <p className="font-bold truncate">{employee.fname} {employee.lname}</p>
                                <p className="font-light text-xs truncate">{employee.position}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {generateParentDiv()}
            </div>
        </div>
        <dir>
            <CalendarPages />
        </dir>
    </div>
  )
}
  