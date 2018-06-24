import React from 'react';
import ImageGallery from 'react-image-gallery';
import '../css/image-gallery.css';
import $ from 'jquery'

let images = [];

class EvolvedGallery extends React.Component {
  constructor() {
    super();
    this.handleSlide = this.handleSlide.bind(this);
    this.state = {
      images: images,
    };
  }

  componentDidMount() {
    const that = this

    const apiKey = "8K1ZKkkseFokAttTo7Xa";

    $.ajax({
      url: "https://api.digitalnz.org/v3/records.json?text=NewZealand&[category][]=Images&per_page=10000&api_key=" + apiKey,
      beforeSend: function (xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
    },
      type: "GET"
    })
      .done(function (data) {
        console.log(data.search.results);

        let tempPhotos = [];
        let photoInList = [];
        let w = 0;
        let h = 0;

        data.search.results.forEach(element => {
          if (element.thumbnail_url && element.large_thumbnail_url && !photoInList.includes(element.thumbnail_url)) {
            w = Math.floor(Math.random() * 2) + 1;
            h = Math.floor(Math.random() * 2) + 1;

            photoInList.push(element.thumbnail_url);

            tempPhotos.push({
              original: element.large_thumbnail_url,
              thumbnail: element.thumbnail_url,
              description: element.description
            });
          }
        });

        that.setState({
          images: tempPhotos,
        });

      })
      .fail(function () {
        console.log("API connection failed!");
      });

  }

  handleSlide = (index) => {
    console.log('Slid to ' + index);
  }

  render = () => {
    let gallerymenu = [];

    // Add an action link for each image.
    gallerymenu.push({
      text: 'Download',
      callback: function (idx) {
        //Do something with image at given index.
      }
    });
    return (

      <ImageGallery
        items={this.state.images}
        gallerymenu={gallerymenu}
        autoPlay={true}
        showFileMeta={false}
        showBullets={true}
        slideInterval={4000}
        onSlide={this.handleSlide} />
    );
  }
}

export default EvolvedGallery;