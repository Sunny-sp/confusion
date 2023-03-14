import React, { useEffect } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutComponent';
import Favorite from './FavoriteComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  postComment, editComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback,
  loginUser, logoutUser, signupUser, deleteComment, fetchFavorite, deleteFavorite, postFavorite
} from '../redux/ActionsCreators';
import { actions } from 'react-redux-form';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    auth: state.auth,
    favorite: state.favorite,
    userFeedback: state.userFeedback
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  editComment: (commentId, rating, comment) => dispatch(editComment(commentId, rating, comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (username, password) => dispatch(loginUser(username, password)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (firstname, lastname, username, password) => dispatch(signupUser(firstname, lastname, username, password)),
  fetchFavorite: () => dispatch(fetchFavorite()),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
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
  const { dishId } = useParams();
  return (
    <DishDetail
    dish={props.dishes.filter((dish) => dish._id === dishId)[0]}
    dishesLoading = {props.dishesLoading}
    dishesErrMess = {props.dishesErrMess}
    comments={props.comments.filter((comment) => comment.dishId === dishId)}
    commentsErrMess = {props.commentsErrMess}
    isCommentLoading = {props.isCommentLoading}
    editComment={props.editComment}
    postComment = {props.postComment}
    deleteComment={props.deleteComment}
    auth={props.auth}
    isFavorite={props.favorite.dishes.filter(favoriteDish => favoriteDish._id === dishId).length > 0}
    postFavorite={props.postFavorite}
    favorite={props.favorite}
    />
  );
};

const Main = (props) => {
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
    props.fetchPromos();
    props.fetchLeaders();
    if (props.auth.isAuthenticated) {
      props.fetchFavorite();
    }
  }, []);
  const location = useLocation();
  return (
      <div>
        <Header signupUser = {props.signupUser} loginUser = {props.loginUser} auth ={props.auth} logoutUser={props.logoutUser}
          />
        <TransitionGroup>
          <CSSTransition key = {location.key} timeout = {100} classNames = 'page'>
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
                <Route path='/menu/:dishId'
                  element={<DishWithId
                    dishes={props.dishes.dishes}
                    dishesLoading = {props.dishes.isLoading}
                    dishesErrMess = {props.dishes.errMess}
                    comments = {props.comments.comments}
                    commentsErrMess = {props.comments.errMess}
                    isCommentLoading = {props.comments.isCommentLoading}
                    editComment={props.editComment}
                    postComment = {props.postComment}
                    deleteComment={props.deleteComment}
                    auth={props.auth}
                    favorite={props.favorite}
                    postFavorite={props.postFavorite}/>}/>
                <Route exact path='/contactus' element={<Contact
                  resetFeedbackForm = {props.resetFeedbackForm}
                  postFeedback = {props.postFeedback}
                  userFeedback={props.userFeedback}/>}/>
                <Route exact path='/aboutus' element={
                  <AboutUs leaders={props.leaders.leaders}
                  leadersLoading = {props.leaders.isLoading}
                  leadersErrMess = {props.leaders.errMess}/>} />
                <Route path='*' element={<Navigate to='/home'/>}/>
                <Route exact path='/favorite'
                  element={<Favorite favorite={props.favorite} auth={props.auth}
                    deleteFavorite={props.deleteFavorite}/>}>
                </Route>
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
