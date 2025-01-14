import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const ListEmployee = () => {

    const[employee ,setEmployee] = useState([])
    const navigate = useNavigate();

    useEffect(()=> {
        getAllEmployees();
    }, []);

    function getAllEmployees(){
        axios.get('http://localhost:9092/employee/all').then((response) => {
            setEmployee(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function addNewEmployee(){
        navigate('/add-employee')
    }

    function updateEmployee(id){
        navigate(`/edit-employee/${id}`)
    }
    function deleteEmployee(id){
        console.log(id);
        axios.delete(`http://localhost:9092/employee/`+id).then((response) => {
            console.log(response.data);
            getAllEmployees();
        }).catch(error =>{
            console.error(error);
        })
    }

  return (
    <div className='container'>

        <button className='btn btn-primary mb-2' onClick={addNewEmployee} >Add Employee</button>

        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employee.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)} style = {{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
      
    </div>
  )
}

export default ListEmployee
