import React, { Component } from 'react'
import Menu from './MenuComponent'
import { DISHES } from '../shared/dishes'
import DishDetail from './DishDetailComponent'
import Header from '../components/HeadeComponent'
import Footer from '../components/FooterComponent'
class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dishes: DISHES,
      selectedDishId: null
    }
  }

  handleDishSelect (dishId) {
    this.setState({
      selectedDishId: dishId
    })
  }

  render () {
    return (
            <div>
            <Header/>
            <Menu dishes={this.state.dishes} onDishSelect = {(dishId) => this.handleDishSelect(dishId)}/>
            <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDishId)[0]}/>
            <Footer/>
          </div>
    )
  }
}
export default Main
