import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';
const Footer = () => {
    return (
        <footer className='font-small special-color-dark '>
            <Row>
                <Col>
                    <ul className='list-unstyled list-inline text-center'>
                        <li className='list-inline-item'>
                            <a className='btn-floating btn-fb mx-1'>
                                <i className='fab fa-facebook-f'> </i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='btn-floating btn-tw mx-1'>
                                <i className='fab fa-twitter'> </i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='btn-floating btn-gplus mx-1'>
                                <i className='fab fa-google-plus-g'> </i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='btn-floating btn-li mx-1'>
                                <i className='fab fa-linkedin-in'> </i>
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a className='btn-floating btn-dribbble mx-1'>
                                <i className='fab fa-dribbble'> </i>
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </footer>
    );
};
export default Footer;
