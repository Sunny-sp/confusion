import React, {Component} from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from "./DishdetailComponent  ";
class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES,
            selectedDishId:null
        }
    }
    handleDishSelect(dishId){
        this.setState({
            selectedDishId:dishId
        });
    }
    render(){
        return(
            <div>
            <Navbar dark color='primary'>
              <div className='container'>
                <NavbarBrand href='/'>risetorante confusion</NavbarBrand>
              </div>
            </Navbar >
            <Menu dishes={this.state.dishes} onDishSelect = {(dishId)=>this.handleDishSelect(dishId)}/>
            <DishDetail  dish = {this.state.dishes.filter(dish=>dish.id===this.state.selectedDishId)[0]}/>
          </div>
        )
    }
}
export default Main;
