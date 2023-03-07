import React, { useEffect, useState } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col, CardImgOverlay } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../redux/BaseUrl';

function CommentForm (props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
    if (props.isModalOpen) {
      setModalName(props.modalName);
    }
  }, [props.isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!props.isModalOpen) {
      setModalName('Sumbit Comment');
    }
    if (props.isModalOpen) {
      props.toggleModal();
    }
  };

  const handleSubmit = (values) => {
    if (props.isModalOpen) {
      console.log(props.commentId, values.rating, values.comment);
      console.log(props.commentId.substring(0, 2));
      props.editComment(props.commentId, values.rating, values.comment);
    }
    toggleModal();
    if (modalName === 'Sumbit Comment') {
      props.postComment(props.dishId, values.rating, values.comment);
    }
  };

  return (
  <React.Fragment>
  <Button name='Submit Comment' outline onClick={toggleModal}>
      <span name='Submit Comment' className='fa fa-pencil'/> Submit Comment
  </Button>
  <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{modalName}</ModalHeader>
      <ModalBody>
          <LocalForm onSubmit={handleSubmit}>
              <Row className='form-group m-1'>
                  <Label className='col-3'>Rating</Label>
                  <Col md={12}>
                      <Control.select model='.rating' id='rating' className='col-12' defaultValue={1}>
                          <option disabled>please select--</option>
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

function RenderDish ({ dish, isFavorite, postFavorite, auth }) {
  const toggleFavorite = () => {
    if (!isFavorite) {
      postFavorite(dish._id);
    }
  };

  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardImgOverlay>
            {
              auth.isAuthenticated
                ? <Button onClick={toggleFavorite}>
              {
                isFavorite
                  ? <span className='fa fa-heart' style={{ color: 'red' }}/>
                  : <span className='fa fa-heart-o'/>
              }
            </Button>
                : null
            }
          </CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments ({ comments, dishId, postComment, editComment, deleteComment, auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState('');
  const modalName = 'Edit Comment';
  const toggleModal = (e) => {
    if (!isModalOpen) {
      setCommentId(e.target.id);
    }
    setIsModalOpen(!isModalOpen);
  };

  const deleteCommentFromDish = (e) => {
    deleteComment(e.target.id);
  };

  if (comments != null) {
    return (
        <div>
          <h4>Comments</h4>
          <hr/>
          {comments.map(({ _id, rating, comment, author, date }) => {
            return (
              <div key={_id} className='container'>
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
                    {
                      auth.isAuthenticated
                        ? (author.username === JSON.parse(localStorage.getItem('cred')).username
                            ? <><div className='col-3 col-sm-2 col-md-3 col-lg-2'>
                        <Button id={_id} name='Edit Comment' className='fa fa-edit' onClick={toggleModal} />
                      </div><div className='col-3 col-sm-2 col-md-3 col-lg-2'>
                          <Button id={_id} name='Delete' className='fa fa-trash' onClick={deleteCommentFromDish} />
                        </div></>
                            : null)
                        : null
                    }
                </div>
                <hr/>
              </div>
            );
          })}
          <CommentForm modalName={modalName} toggleModal = {toggleModal} isModalOpen = {isModalOpen}
          dishId = {dishId} postComment = {postComment} editComment={editComment} commentId={commentId}/>
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
            <RenderDish dish = {props.dish} isFavorite={props.isFavorite} postFavorite={props.postFavorite}
              auth={props.auth}/>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments = {props.comments}
              dishId={props.dish._id}
              editComment={props.editComment}
              postComment={props.postComment}
              deleteComment={props.deleteComment}
              auth={props.auth}/>
            </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default DishDetail;
