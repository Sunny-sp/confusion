import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionsCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {
  render () {
    const HomePage = () => {
      return (
          <Home
          dish={this.props.dishes.filter(dish => dish.featured === true)[0]}
          promotion={this.props.promotions.filter(promotion => promotion.featured === true)[0]}
          leader={this.props.leaders.filter(leader => leader.featured === true)[0]}
          />
      );
    };
    const DishWithId = () => {
      const { id } = useParams();
      return (
        <DishDetail
        dish={this.props.dishes.filter((dish) => dish.id === parseInt(id, 10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(id, 10))}
        addComment = {this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
          <Routes>
            <Route exact path='/home' element={<HomePage/>} />
            <Route exact path='/menu'element={<Menu dishes={this.props.dishes}/>}/>
            <Route path='/menu/:id' element={<DishWithId/>}/>
            <Route exect path='/contactus' element={<Contact/>}/>
            <Route exact path='/aboutus' element={<AboutUs leaders={this.props.leaders}/>} />
            <Route path='*' element={<Navigate to='/home'/>}/>
          </Routes>
        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
