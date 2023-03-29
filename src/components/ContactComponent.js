import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, Col, Row, Button } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import LoadingOverlay from 'react-loading-overlay';
import { BeatLoader } from 'react-spinners';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);
const isNumber = (val) => !val || !isNaN(Number(val));
const validEmail = (val) => !val || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(val);

function Contact (props) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(props.userFeedback.isLoading);
  }, [props.userFeedback.isLoading]);

  const handleSubmit = (values) => {
    props.postFeedback(values);
    props.resetFeedbackForm();
  };
  return (
    <div className="container">
        <div className='row'>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Contact Us</BreadcrumbItem>
            </Breadcrumb>
            <div className='col-12'>
                <h3>Contact Us</h3>
                <hr/>
            </div>
        </div>
        <div className="row row-content">
            <div className="col-12">
                <h3>Location Information</h3>
            </div>
            <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                    Om Shivai building wing-A2<br />
                    Borivali East Mumbai<br />
                    <i className="fa fa-phone"></i>: +91 9326321513<br />
                    <i className="fa fa-fax"></i>: +91 8765224321<br />
                    <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
            </div>
            <div className="col-12 col-sm-6 offset-sm-1">
                <h5>Map of our Location</h5>
            </div>
            <div className="col-12 col-sm-11 offset-sm-1">
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                    <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                </div>
            </div>
        </div>
        <LoadingOverlay active = {isLoading} spinner={<BeatLoader/>}/>
        <div className='row row-content'>
            <div className='col-12 col-md-9'>
                <h3>Send Us Your Feedback</h3>
            </div>
            <div className="col-12 col-md-9">
            <Form model='feedback' onSubmit={handleSubmit}>
                <Row className='form-group'>
                    <Label htmlFor='firstname' md={2} >FirstName</Label>
                    <Col md={10}>
                        <Control.text model='.firstName' id='firstName' name='firstName' placeholder='First Name'
                        className='form-control'
                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                        />
                        <Errors className='text-danger' model='.firstName' show='touched'
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                        }}
                        />
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label htmlFor='lastname' md={2} >LastName</Label>
                    <Col md={10}>
                        <Control.text model='.lastName' id='lastName' name='lastName' placeholder='Last Name'
                        className='form-control'
                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                        />
                        <Errors className='text-danger' model='.lastName' show='touched'
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                        }}
                        />
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label htmlFor='telNum' md={2} >Contact Tel.</Label>
                    <Col md={10}>
                        <Control.text model='.telNum' id='telNum' name='telNum' placeholder='Tel. Number'
                        className='form-control'
                        validators={{ required, minLength: minLength(8), maxLength: maxLength(10), isNumber }}
                        />
                        <Errors className='text-danger' model='.telNum' show='touched'
                        messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 7 characters',
                          maxLength: 'Must be 10 characters or less',
                          isNumber: 'Must be a number'
                        }}/>
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label htmlFor='email' md={2} >Email</Label>
                    <Col md={10}>
                        <Control.text model='.email' id='email' name='email'
                        className='from-control'
                        validators={{ required, validEmail }}
                        />
                        <Errors className='text-danger' model='.email' show='touched'
                        messages={{
                          required: 'Required',
                          validEmail: 'Invalid Email Address'
                        }}
                        />
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Col md={{ size: 6, offset: 2 }}>
                        <div className='form-check'>
                        <Label check/>
                            <Control.checkbox model='.agree' name='agree'
                            className='form-check-input'/>
                            <strong>May we contact you?</strong>
                        </div>
                    </Col>
                    <Col md={{ size: 3, offset: 1 }}>
                        <Control.select model='.contactType' name='contactType'
                        className='form-control'>
                            <option>Tel.</option>
                            <option>Email</option>
                            </Control.select>
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Label htmlFor='message' md={2} >Your Feedback</Label>
                    <Col md={10}>
                        <Control.textarea model='.message' id='message' name='message'
                        rows='12' className='form-control'/>
                    </Col>
                </Row>
                <Row className='form-group'>
                    <Col md={{ size: 10, offset: 2 }}>
                        <Button type='submit' color='primary'>Send Feedback</Button>
                    </Col>
                </Row>
            </Form>
            </div>
        </div>
    </div>
  );
}
export default Contact;
