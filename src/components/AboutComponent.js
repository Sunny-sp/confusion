import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, Fade } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../redux/BaseUrl';
import { Loading } from './LoadingComponent';
const RenderLeader = (props) => {
  return (
    <Media>
        <Media left middle>
        <Media object src={baseUrl + props.leader.image} alt={props.leader.name} />
        </Media>
        <Media body className='ml-5'>
            <Media heading>{props.leader.name}</Media>
            <p>{props.leader.designation}</p>
            <p>{props.leader.description}</p>
        </Media>
    </Media>
  );
};

function About (props) {
  const leaders = props.leaders.map((leader) => {
    return (
        <div key={leader.id}>
           <Fade in> <RenderLeader leader={leader}/><br /></Fade>
        </div>
    );
  });
  if (props.leadersLoading) {
    return (
        <div className='container'>
            <Loading/>
        </div>
    );
  } else if (props.leadersErrMess) {
    return (
        <div className='container'>
            <h4>{props.leadersErrMess}</h4>
        </div>
    );
  } else {
    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>About Us</h3>
                </div><hr/>
            </div>
            <div className='row row-content'>
                <div className='col-12 col-md-6'>
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in India.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the worlds best cuisines in a pan.</p>
                </div>
                <div className='col-12 col-md-5'>
                    <Card>
                    <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <div className='row p-1'>
                                <dt className='col-6'>Started</dt>
                                <dd className='col-6'>3 Feb. 2013</dd>
                                <dt className='col-6'>Major Stake Holder</dt>
                                <dd className='col-6'>IND Fine Foods Inc.</dd>
                                <dt className='col-6'>Last Years Turnover</dt>
                                <dd className='col-6'>$1,250,375</dd>
                                <dt className='col-6'>Employees</dt>
                                <dd className='col-6'>40</dd>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-12'>
                    <Card>
                    <CardBody className="bg-faded">
                        <blockquote className="blockquote">
                            <p className="mb-0">You better cut the pizza in four pieces because
                                Im not hungry enough to eat six.</p><br/>
                            <footer className="blockquote-footer">Yogi Berra,
                            <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                P. Pepe, Diversion Books, 2014</cite>
                            </footer>
                        </blockquote>
                    </CardBody>
                    </Card>
                </div>
            </div>
            <div className='row row-content'>
                <div className='col-12'>
                    <h2>Corporate Leadership</h2>
                </div>
                <div className='col-12'>
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
  }
}
export default About;
