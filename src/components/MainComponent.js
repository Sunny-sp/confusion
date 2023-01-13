import React, { useEffect } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionsCreators';
import { actions } from 'react-redux-form';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

const HomePage = (props) => {
  return (
      <Home
      dish={props.dishes.filter(dish => dish.featured === true)[0]}
      dishesLoading = {props.dishesLoading}
      dishesErrMess = {props.dishesErrMess}
      promosLoading = {props.promosLoading}
      promosErrMess = {props.promosErrMess}
      promotion = {props.promotions.filter(promotion => promotion.featured === true)[0]}
      leader={props.leaders.filter(leader => leader.featured === true)[0]}
      leadersLoading = {props.leadersLoading}
      leadersErrMess = {props.leadersErrMess}
      />
  );
};

const DishWithId = (props) => {
  const { id } = useParams();
  return (
    <DishDetail
    dish={props.dishes.filter((dish) => dish.id === parseInt(id, 10))[0]}
    dishesLoading = {props.dishesLoading}
    dishesErrMess = {props.dishesErrMess}
    comments={props.comments.filter((comment) => comment.dishId === parseInt(id, 10))}
    commentsErrMess = {props.commentsErrMess}
    postComment = {props.postComment}
    />
  );
};

const Main = (props) => {
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
  }, []);
  const location = useLocation();
  return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key = {location.key} timeout = {300} classNames = 'page'>
              <Routes>
                <Route exact path='/home'
                  element={<HomePage
                    dishes={props.dishes.dishes}
                    dishesLoading = {props.dishes.isLoading}
                    dishesErrMess = {props.dishes.errMess}
                    promotions = {props.promotions.promotions}
                    promosLoading = {props.promotions.isLoading}
                    promosErrMess = {props.promotions.errMess}
                    leaders={props.leaders.leaders}
                    leadersLoading = {props.leaders.isLoading}
                    leadersErrMess = {props.leaders.errMess}/>} />
                <Route exact path='/menu'element={<Menu dishes={props.dishes}/>}/>
                <Route path='/menu/:id'
                  element={<DishWithId
                    dishes={props.dishes.dishes}
                    dishesLoading = {props.dishes.isLoading}
                    dishesErrMess = {props.dishes.errMess}
                    comments = {props.comments.comments}
                    commentsErrMess = {props.comments.errMess}
                    postComment = {props.postComment}/>}/>
                <Route exect path='/contactus' element={<Contact
                  resetFeedbackForm = {props.resetFeedbackForm}
                  postFeedback = {props.postFeedback}/>}/>
                <Route exact path='/aboutus' element={
                  <AboutUs leaders={props.leaders.leaders}
                  leadersLoading = {props.leaders.isLoading}
                  leadersErrMess = {props.leaders.errMess}/>} />
                <Route path='*' element={<Navigate to='/home'/>}/>
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
