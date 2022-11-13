import { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
class DishDetail extends Component {
  renderDish(dish) {
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
  renderComments(dish) {
    if (dish != null) {
      return (
        <div>
          {dish.comments.map(({ id, comment, author, date }) => {
            return (
              <ul key={id} style={{ listStyle: "none" }}>
                <li>{comment}</li>
                <br />
                <li>
                  --{author}, {moment(date).format("MMM DD, yyyy")}
                </li>
                <br />
              </ul>
            );
          })}
        </div>
      );
    }
  }
  render() {
    const { selectedNewDish } = this.props;
    return (
      <div className="row">
        {this.renderDish(selectedNewDish)}
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(selectedNewDish)}
        </div>
      </div>
    );
  }
}
export default DishDetail;
