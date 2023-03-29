import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle
} from 'reactstrap';
import { Loading } from '../components/LoadingComponent';
import { baseUrl } from '../redux/BaseUrl';
function RenderCard ({ item, isLoading, errMess }) {
  if (isLoading) {
    return (
      <Loading/>
    );
  } else if (errMess) {
    return (
      <h4>{errMess}</h4>
    );
  } else if (item != null) {
    return (
        <Card>
          <CardImg width="100%" src={baseUrl + item.image} />
          <CardBody style={ { background: 'rgb(230,230,250)' }}>
            <CardTitle style={{ fontSize: 20 }}>{item.name}</CardTitle>
            {item.designation
              ? (
              <CardSubtitle style={{ fontSize: 15 }}>{item.designation}</CardSubtitle>
                )
              : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
    );
  }
}

function Home (props) {
  return (
    <div className="container">
      <div>
        <h2>Promotion</h2>
      </div>
      <hr/>
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item = {props.dish}
          isLoading = {props.dishesLoading}
          errMess = {props.dishesErrMess}/>
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item = {props.promotion}
          isLoading = {props.promosLoading}
          errMess = {props.promosErrMess}/>
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item = {props.leader}
          isLoading = {props.leadersLoading}
          errMess = {props.leadersErrMess}/>
        </div>
      </div>
    </div>
  );
}
export default Home;
