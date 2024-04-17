
  import { Chart as ChartJS } from 'chart.js/auto';
  import { Bar } from 'react-chartjs-2';
import { DepartementManag } from "./DepartementManag";
import { axiosInstance } from '@/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addDepartment } from '@/State/departmentSlice';



export const DepartmentComp = () => {
    
      const dispatch = useDispatch();
      const getData = async () => {
        try {
            const response = await axiosInstance.get('/departments');
            response.data.data.forEach((department) => {
                dispatch(addDepartment(department));
              });
        } catch (error) {
            console.error(error);
        }
      }
    
    useEffect(() => {
        if(departments.length === 0){
            getData();
        }
    }, []);

    const departments = useSelector(state => state.department);
    const names = departments.map(department => department.name);
    const colors = departments.map(department => department.color);
    
    const data = {
        labels: names,
        datasets: [
          {
            data: [4, 8, 13, 6, 8],
            backgroundColor: colors,
        
          }
        ],
      };
      const options = {
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              stepSize: 4,
            },
            gridBars: {
              color: '#16B2F1',
              zeroBarColor: 'red'
            },
            scaleLabel: {
              display: true,
              labelString: 'Employees by',
              fontColor: 'rgba(0, 0, 0, 0.5)',
              fontSize: 14
            }
          }
        },
        plugins: {
            legend: {
              display: false,
            }
        },
        elements: {
            bar: {
              borderRadius: 5, 
            }
          }
      
      };


  return (
    <div className="bg-white h-96 shadow-slate-300 shadow-md ml-6 mt-6 w-43/100 rounded-md p-4 ">
       <div className="flex justify-between items-center">
        <p className="font-bold">Employees by department</p>
          <DepartementManag />

       </div>
       <Bar className="mt-4" data={data} options={options}/>

    </div>
  )
}