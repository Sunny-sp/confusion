import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from 'moment';

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
function RenderComments ({ dish }) {
  if (dish != null) {
    return (
        <div>
          <h4>Comments</h4>
          {dish.comments.map(({ id, comment, author, date }) => {
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
        <RenderDish dish = {props.dish}/>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish = {props.dish}/>
        </div>
      </div>
      </div>
  );
}

export default DishDetail;
