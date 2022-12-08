import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);

class CommentForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleSubmit (values) {
    this.toggleModal();
    alert('User details: ' + JSON.stringify(values));
  };

  render () {
    return (
    <React.Fragment>
    <Button outline onClick={this.toggleModal}>
        <span className='fa fa-pencil'/> Submit Comment
    </Button>
    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
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
    </React.Fragment>
    );
  }
}

function RenderDish ({ dish }) {
  if (dish != null) {
    return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments ({ comments }) {
  if (comments != null) {
    return (
        <div>
          <h4>Comments</h4>
          {comments.map(({ id, comment, author, date }) => {
            return (
              <div key={id} >
                <p>{comment}</p>
                <p>
                  --{author}, {moment(date).format('MMM DD, yyyy')}
                </p>
              </div>
            );
          })}
        </div>
    );
  } else {
    return (
        <div></div>
    );
  }
}
function DishDetail (props) {
  return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr/>
          </div>
            <RenderDish dish = {props.dish}/>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments = {props.comments}/>
              <CommentForm/>
            </div>
        </div>
      </div>
  );
}
export default DishDetail;
