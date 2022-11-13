import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import React, { Component } from "react";
import DishDetail from "./DishdetailComponent  ";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: this.props.selectedNewDish,
    };
  }
  componentDidMount() {
    this.setState({ selectedDish: this.props.selectedNewDish });
  }
  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }
  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle
                style={{ cursor: "pointer" }}
                onClick={() => this.onDishSelect(dish)}
              >
                {dish.name}
              </CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <>
        <div className="container">
          <div className="row">{menu}</div>
        </div>
        <div className="container">
          <div className="row">
            <DishDetail selectedNewDish={this.state.selectedDish} />
          </div>
        </div>
      </>
    );
  }
}
export default Menu;
