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

const HomePage = (props) => {
  return (
      <Home
      dish={props.dishes.filter(dish => dish.featured === true)[0]}
      promotion={props.promotions.filter(promotion => promotion.featured === true)[0]}
      leader={props.leaders.filter(leader => leader.featured === true)[0]}
      />
  );
};

const DishWithId = (props) => {
  const { id } = useParams();
  return (
    <DishDetail
    dish={props.dishes.filter((dish) => dish.id === parseInt(id, 10))[0]}
    comments={props.comments.filter((comment) => comment.dishId === parseInt(id, 10))}
    addComment = {props.addComment}
    />
  );
};

class Main extends Component {
  render () {
    return (
      <div>
        <Header />
          <Routes>
            <Route exact path='/home'
              element={<HomePage
                dishes={this.props.dishes}
                promotions={this.props.promotions}
                leaders={this.props.leaders}/>} />
            <Route exact path='/menu'element={<Menu dishes={this.props.dishes}/>}/>
            <Route path='/menu/:id'
              element={<DishWithId
                dishes={this.props.dishes}
                comments={this.props.comments}
                addComment = {this.props.addComment}/>}/>
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
