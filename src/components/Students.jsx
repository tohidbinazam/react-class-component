import axios from 'axios';
import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row, Table } from 'react-bootstrap';
import StudentsModal from './StudentsModal';

export class Students extends Component {
    constructor(props){
        super(props)
        this.state = {
            students : [],
            modal : {
                type : '',
                status : false
            },
            inputs : {},
            dataId : null
        }
    }
  render() {

    
    const { students, modal, inputs, dataId } = this.state
    const { type, status } = modal

    // Student add modal show
    const handleShowModal = () => {
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'create',
                status : true
            }
        }))
    }

    // Modal hide
    const handleHideModal = () => {
        this.setState((preState) => ({
            ...preState,
            modal : { status : false },
            inputs : {}
        }))
    }

    // Student data view
    const handleViewModal = (id) => {
        let student = students.find(data => data.id === id)
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'view',
                status : true
            },
            inputs : student
        }))
    }

    // Student data delete
    const handleDeleteModal = (id) => {
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'delete',
                status : true
            },
            dataId : id
        }))
    }

    // Student data Edit
    const handleEditModal = (id) => {
        let student = students.find(data => data.id === id)
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'edit',
                status : true
            },
            inputs : student
        }))
    }

    // Add student form submit
    const formSubmit = (obj, e) => {
        this.setState((preState) => ({
            ...preState,
            inputs : obj
        }))
        e.preventDefault()
        try{
            axios.post('http://localhost:5050/students', inputs).then(() => {
                handleHideModal()
            })
        }catch(err){
            console.log(err);
        }
    }

    // Student Data update
    const formUpdate = (obj, e) => {
        this.setState((preState) => ({
            ...preState,
            inputs : obj
        }))
        e.preventDefault()
        try{
            axios.patch(`http://localhost:5050/students/${inputs.id}`, inputs).then(() => {
                handleHideModal()
            })
        }catch(err){
            console.log(err);
        }
    }

    // student data get
    try{
        axios.get('http://localhost:5050/students').then(res => {
            this.setState((preState) => ({
                ...preState,
                students : res.data.reverse()
            }))
        })
    }catch(err){
        console.log(err);
    }


    return (
        <div className='my-5'>
        <Container>
            <Row className='justify-content-center'>
                <Col md='8'>
                    <StudentsModal formUpdate={ formUpdate } dataId={ dataId } formSubmit={ formSubmit } type={ type } status={ status } handleHideModal={ handleHideModal } inputs={ inputs }/>
                    <Card>
                        <Card.Header>
                            <Button onClick={ handleShowModal }>Add New Student</Button>
                            <h3 className='text-center'>All Students</h3>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>Photo</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((data, index) => 
                                            <tr>
                                                <td>{ index + 1 }</td>
                                                <td>{ data.name }</td>
                                                <td>{ data.email }</td>
                                                <td>+{ data.number }</td>
                                                <td><img style={{ width:'50px', objectFit:'cover' }} src={ data.photo } alt={ data.id } /></td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button onClick={ () => handleViewModal(data.id) }>View</Button>
                                                        <Button onClick={ () => handleEditModal(data.id) } variant='warning'>Edit</Button>
                                                        <Button onClick={ () => handleDeleteModal(data.id) } variant='danger'>Delete</Button>
                                                    </ButtonGroup>   
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
  }
}

export default Students