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
            inputs : {}
        }
    }
  render() {

    
    const { students, modal, inputs } = this.state
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
            modal : {
                type : '',
                status : false
            }
        }))
    }

    // Student data view
    const handleViewModal = () => {
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'view',
                status : true
            }
        }))
    }

    // Student data delete
    const handleDeleteModal = () => {
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'delete',
                status : true
            }
        }))
    }

    // Student data Edit
    const handleEditModal = () => {
        this.setState((preState) => ({
            ...preState,
            modal : {
                type : 'edit',
                status : true
            }
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
                this.setState((preState) => ({
                    ...preState,
                    modal : { status : false },
                    inputs : {}
                }))
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
                    <StudentsModal formSubmit={ formSubmit } type={ type } status={ status } handleHideModal={ handleHideModal } inputs={ inputs }/>
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
                                                        <Button onClick={ handleViewModal }>View</Button>
                                                        <Button onClick={ handleEditModal } variant='warning'>Edit</Button>
                                                        <Button onClick={ handleDeleteModal } variant='danger'>Delete</Button>
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