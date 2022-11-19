import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import React from 'react';

function RenderMenuItem ({ dish, dishSelect }) {
  return (
    <Card>
    <CardImg width="100%" src={dish.image} alt={dish.name} />
    <CardImgOverlay onClick={() => dishSelect(dish.id)}>
      <CardTitle>{dish.name}</CardTitle>
    </CardImgOverlay>
  </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} dishSelect={props.onDishSelect}/>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
