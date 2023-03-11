import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../redux/BaseUrl';
function RenderMenuItem ({ dish }) {
  return (
    <Card>
      <Link to ={`/menu/${dish._id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
  </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish._id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish}/>
      </div>
    );
  });
  if (props.dishes.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading isLoading={props.dishes.isLoading}/>
        </div>
    </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h4>{props.dishes.errMess}</h4>
          </div>
        </div>
    </div>
    );
  } else {
    return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>Menu</BreadcrumbItem>
      </Breadcrumb>
      <div className='col-12'>
        <h3>Menu</h3>
        <hr/>
      </div>
      <div className="row">{menu}</div>
    </div>
    );
  }
};

export default Menu;
