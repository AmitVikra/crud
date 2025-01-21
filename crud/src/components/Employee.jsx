import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Employee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [salary, setSalary] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:9092/employee/${id}`).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setSalary(response.data.salary);
            }).catch(error =>
                console.error(error)
            )
        }

    }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, salary }
        console.log(employee)

        if (id) {
            axios.put(`http://localhost:9092/employee/${id}`, employee).then((response) => {
                console.log(response.data);
                navigate('/employees')
            }).catch((error) => {
                console.error(error);
            })
        }else{
            axios.post('http://localhost:9092/employee/', employee).then((response) => {
                console.log(employee);
                navigate('/employees')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    const pageTitle = ()=> {
        if (id) {
            return <h2 className='text-center'> Update Employee </h2>
        } else {
            return <h2 className='text-center'> Add Employee</h2>
        }
    }


    return (
        <div className='container col-md-5'>
            <div className='row'>
                <div className='card'>
                    {pageTitle()}
                    <div className='card-body'>
                    <form>

                        <div className='form-group mb-2 '>
                            <label className='form-label'>First Name</label>
                            <input type="text"
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className='form-control'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label' >Last Name</label>
                            <input type="text"
                                placeholder='Enter Last Name'
                                name='lastname'
                                value={lastName}
                                className='form-control'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'> Salary</label>
                            <input type='number'
                                placeholder='Enter salary'
                                value={salary}
                                name='salary'
                                className='form-control'
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

                    </form>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Employee
