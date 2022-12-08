import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Row, Button, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

function CommentForm () {
  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || (val.length <= len);
  const minLength = (len) => (val) => !val || (val.length >= len);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleSubmit = (values) => {
    toggleModal();
    alert('User details: ' + JSON.stringify(values));
  };
  return (
    <>
    <Button outline onClick={toggleModal}>
        <span className='fa fa-pencil'/> Submit Comment
    </Button>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={handleSubmit}>
                <Row className='form-group m-1'>
                    <Label className='col-3'>Rating</Label>
                    <Col md={12}>
                        <Control.select model='.rating' id='rating' className='col-12'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className='form-group m-1'>
                    <Label className='col-sm-3'>Your Name</Label>
                    <Col md={12}>
                        <Control.text model='.userName' placeholder='Name' className='form-control col-12'
                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                        />
                        <Errors model='.userName' show='touched' className='text-danger'
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                        }}
                        />
                    </Col>
                </Row>
                <Row className='form-group m-1'>
                    <Label className='col-3'>Comment</Label>
                    <Col md={12}>
                        <Control.textarea
                        model='.comment' id='.comment' placeholder='write here comments...' className='col-12'
                        />
                    </Col>
                </Row>
                <Row className='form-group m-1'>
                    <Col>
                        <Button type='submit' color='primary'>Submit</Button>
                    </Col>
                </Row>
            </LocalForm>
        </ModalBody>
    </Modal>
    </>
  );
}
export default CommentForm;
