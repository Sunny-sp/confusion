import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../redux/BaseUrl';

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
    this.props.postComment(this.props.dishId, values.rating, values.comment);
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
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments ({ comments, dishId, postComment }) {
  const toggleModal = (props) => {
    this.setState({
      isModalOpen: !props.isModalOpen
    });
  };
  if (comments != null) {
    return (
        <div>
          <h4>Comments</h4>
          <hr/>
          {comments.map(({ id, rating, comment, author, date }) => {
            return (
              <div key={id} className='container'>
                <div className='row'>
                  <span>{comment}</span>
                  <span>
                    --{author.firstname + ' ' + author.lastname}, {moment(date).format('MMM DD, yyyy')}
                  </span>
                </div>
                  <div className='row'>
                    <div className='col-4 col-sm-3 col-md-5 col-lg-3'>
                      <span>Rating: {rating}</span>
                    </div>
                    <div className='col-3 col-sm-2 col-md-3 col-lg-2'>
                      <span className='fa fa-edit' onClick={toggleModal}/>
                    </div>
                    <div className='col-3 col-sm-2 col-md-3 col-lg-2'>
                      <span className='fa fa-trash'/>
                    </div>
                </div>
                <hr/>
              </div>
            );
          })}
          <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
  } else {
    return (
        <div></div>
    );
  }
}
function DishDetail (props) {
  if (props.dishesLoading) {
    return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
  } else if (props.dishesErrMess) {
    return (
        <div className="container">
            <div className="row">
                <h4>{props.dishesErrMess}</h4>
            </div>
        </div>
    );
  } else if (props.dish != null) {
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
              <RenderComments comments = {props.comments}
              dishId={props.dish._id}
              postComment={props.postComment}/>
            </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default DishDetail;
