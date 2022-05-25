import React, { Component } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export class StudentsModal extends Component {
    constructor(props){
        super()
    }
  render() {

    const { type, status, handleHideModal, formSubmit, inputs } = this.props
    const { name, email, number, photo } = inputs

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
                        <img style={{ width:'100%' }} src="https://cdn.powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png" alt="" />
                    </Col>
                    <Col className='text-center' md='6'>
                        <h5>Name: Tohid Bin Azam</h5><hr />
                        <h5>Email<br /> tohid@gmail.com</h5><hr />
                        <h5>Number +8801994249463</h5>
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
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Type your name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Give your email address' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number</Form.Label>
                        <Form.Control type='number' placeholder='Type your number' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type='url' placeholder='Give your photo link' />
                    </Form.Group>
                    <Button className='my-3 w-100' type='submit'>Update Data</Button>
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
                <Button variant='danger'>Delete</Button>
            </Modal.Footer>
        </Modal>  
    )}
  }
}

export default StudentsModal