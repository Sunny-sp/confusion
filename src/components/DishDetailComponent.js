import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
            </div>
        </div>
      </div>
  );
}

export default DishDetail;