import React from 'react';
import { Button } from 'reactstrap';
import { baseUrl } from '../redux/BaseUrl';

const Favorite = (props) => {
  const deleteFavoriteDish = (e) => {
    console.log('dishid to remove: ' + e.target.id);
    props.deleteFavorite(e.target.id);
  };
  return (
    props.auth.isAuthenticated
      ? <div className='container'>
        {
            props.favorite.dishes.map(dish => {
              return (
                <div key={dish._id} className='row my-3'>
                    <div className='col-2'>
                        <img src={baseUrl + dish.image} alt={dish.name}/>
                    </div>
                    <div className='col-8'>
                        <h2>{dish.name}</h2>
                        <p>{dish.description}</p>
                        <Button id={dish._id} outline color='danger' className='fa fa-close' onClick={deleteFavoriteDish}>
                        </Button>
                    </div>
                </div>
              );
            })
        }
        </div>
      : null
  );
};
export default Favorite;
