import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
} from "reactstrap";

export const Menu = (props) => {
  const [selectedDish, setSelectedDish] = useState({});
  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
  };
  const getDishDescription = (dish) => {
    if (selectedDish !== null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle heading>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
    else{
        <div></div>
    }
  };
  return (
    <div className="container">
      <div className="row">
        {props.dishes.map((dish) => {
          return (
            <div className="col-12 col-md-5 m-1">
              <Card key={dish.id}>
                <CardImg src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                  <CardTitle
                    style={{ cursor: "pointer" }}
                    heading
                    onClick={() => handleDishSelect(dish)}
                  >
                    {dish.name}
                  </CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
        })}
      </div>
      {getDishDescription(selectedDish)}
    </div>
  );
};
