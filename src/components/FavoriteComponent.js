import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { Button, Breadcrumb, BreadcrumbItem, CardImg } from 'reactstrap';
import { baseUrl } from '../redux/BaseUrl';
import { BeatLoader } from 'react-spinners';
const Favorite = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(props.favorite.isLoading);
  }, [props.favorite.isLoading]);

  const deleteFavoriteDish = (e) => {
    console.log('dishid to remove: ' + e.target.id);
    props.deleteFavorite(e.target.id);
  };
  return (
    <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem>Favorites</BreadcrumbItem>
          </Breadcrumb>
          <hr/>
          {
            props.auth.isAuthenticated
              ? <>
              <LoadingOverlay active = {isLoading} spinner={<BeatLoader/>}/>
              <div className='container'>
                {
                  props.favorite.dishes.map(dish => {
                    return (
                      <div key={dish._id} className='row'>
                          <div className='col-xl-3 col-lg-6 col-md-4 col-sm-4 my-2'>
                              <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                          </div>
                          <div className='col-xl-8 col-lg-6 col-md-8 col-sm-8 my-2'>
                              <h2>{dish.name}</h2>
                              <p>{dish.description}</p>
                              <Button id={dish._id} outline color='danger' className='fa fa-close' onClick={deleteFavoriteDish}>
                              </Button>
                          </div>
                          <hr/>
                      </div>
                    );
                  })
              }
              </div>
            </>
              : null
          }
        </div>
      </div>
  );
};
export default Favorite;
