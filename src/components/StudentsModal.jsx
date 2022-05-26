import axios from 'axios';
import React, { Component } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export class StudentsModal extends Component {
    constructor(props){
        super()
    }
  render() {

    const { type, status, handleHideModal, formSubmit, inputs, dataId, formUpdate } = this.props
    const { name, email, number, photo } = inputs

    // Delete student data
    const handleDeleteData = (id) => {
        try{
            axios.delete(`http://localhost:5050/students/${id}`).then(() => {
            handleHideModal()
            })
        }catch(err){
            console.log(err);
        }
    }


    if(type === 'create'){
    return (
        <Modal show={ status } onHide={ handleHideModal } centered>
            <Modal.Header closeButton>
                <h3>Add New Student Data</h3>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => formSubmit(inputs, e) }>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={ name } onChange={e => formSubmit({
                            ...inputs,
                            name: e.target.value
                        })} type='text' placeholder='Type your name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={ email } onChange={e => formSubmit({
                            ...inputs,
                            email: e.target.value
                        })} type='email' placeholder='Give your email address' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number</Form.Label>
                        <Form.Control value={ number } onChange={e => formSubmit({
                            ...inputs,
                            number: e.target.value
                        })} type='number' placeholder='Type your number' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control value={ photo } onChange={e => formSubmit({
                            ...inputs,
                            photo: e.target.value
                        })} type='url' placeholder='Give your photo link' />
                    </Form.Group>
                    <Button className='my-3 w-100' type='submit'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>   
    )}else if(type === 'view'){
    return (    
        <Modal show={ status } onHide={ handleHideModal } centered>
            <Modal.Header closeButton>
                <h3>Student Data</h3>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md='6'>
                        <img style={{ width:'100%' }} src={ photo } alt="" />
                    </Col>
                    <Col className='text-center' md='6'>
                        <h5>Name: { name }</h5><hr />
                        <h5>Email<br /> { email }</h5><hr />
                        <h5>Number { number }</h5>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>  
    )}else if(type === 'edit'){
    return (    
        <Modal show={ status } onHide={ handleHideModal } centered>
            <Modal.Header closeButton>
                <h3>Edit Student Data</h3>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => formUpdate(inputs, e) }>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={ name } onChange={e => formUpdate({
                            ...inputs,
                            name: e.target.value
                        })} type='text' placeholder='Type your name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={ email } onChange={e => formUpdate({
                            ...inputs,
                            email: e.target.value
                        })} type='email' placeholder='Give your email address' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number</Form.Label>
                        <Form.Control value={ number } onChange={e => formUpdate({
                            ...inputs,
                            number: e.target.value
                        })} type='number' placeholder='Type your number' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control value={ photo } onChange={e => formUpdate({
                            ...inputs,
                            photo: e.target.value
                        })} type='url' placeholder='Give your photo link' />
                    </Form.Group>
                    <Button className='my-3 w-100' type='submit'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal> 
    )}else if(type === 'delete'){
    return (    
        <Modal show={ status } onHide={ handleHideModal } centered>
            <Modal.Header closeButton>
                <h3>Delete Student Data</h3>
            </Modal.Header>
            <Modal.Body>
                Are you sure ?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ handleHideModal }>Cancel</Button>
                <Button onClick={ () => handleDeleteData(dataId) } variant='danger'>Delete</Button>
            </Modal.Footer>
        </Modal>  
    )}
  }
}

export default StudentsModal