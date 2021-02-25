import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import onePhoto from '../assets/onephoto.jpg';
import twoPhoto from '../assets/twophoto.jpg';
import threePhoto from '../assets/threephoto.jpg';
export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel >
                <Carousel.Item>
                    <img 
                    className="d-block w-100"
                    src={ onePhoto }
                    // height="400"
                    width="350"
                    alt="HZ"
                    />
                    <Carousel.Caption>
                        <h3>Finn Wolfhard</h3>
                        <p>A native of Vancouver, British Columbia, actor Finn Wolfhard."</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                    className="d-block w-100"
                    src={ twoPhoto }
                    alt="HZ"
                    />
                    <Carousel.Caption>
                        <h3>Finn Wolfhard</h3>
                        <p>A native of Vancouver, British Columbia, actor Finn Wolfhard."</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                    className="d-block w-100"
                    src={ threePhoto }
                    alt="HZ"
                    />
                    <Carousel.Caption>
                        <h3>Finn Wolfhard</h3>
                        <p>A native of Vancouver, British Columbia, actor Finn Wolfhard."</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )

    }

}