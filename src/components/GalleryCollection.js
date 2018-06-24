import React from 'react';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Photo from './Photo';
import $ from 'jquery'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

let photos = [];
// const photos = [
//   { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
//   { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
//   { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
//   { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
//   { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
//   { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
//   { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
//   { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
//   { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
// ];

const SortablePhoto = SortableElement(Photo);
const SortableGallery = SortableContainer(({ photos }) => {
  return <Gallery photos={photos} ImageComponent={SortablePhoto} />
});

class GalleryCollection extends React.Component {
  constructor() {
    super();
    this.onSortEnd = this.onSortEnd.bind(this);
    this.state = {
      photos: photos,
    };
  }

  componentDidMount() {
    const that = this

    const apiKey = "8K1ZKkkseFokAttTo7Xa";

    $.ajax({
      url: "https://api.digitalnz.org/v3/records.json?text=nba&[category][]=Images&per_page=10000&api_key=" + apiKey,
      type: "GET"
    })
      .done(function (data) {
        console.log(data.search.results);

        let tempPhotos = [];
        let photoInList = [];
        let w = 0;
        let h = 0;

        data.search.results.forEach(element => {
          if (element.thumbnail_url && !photoInList.includes(element.thumbnail_url)) {
            w = Math.floor(Math.random() * 2) + 1;
            h = Math.floor(Math.random() * 2) + 1;

            photoInList.push(element.thumbnail_url);
            
            tempPhotos.push({
              src: element.thumbnail_url, width: w, height: h, captions: "After Rain (Jeshu John - designerspics.com)"
            });
          }
        });

        that.setState({
          photos: tempPhotos,
        });

      })
      .fail(function () {
        console.log("API connection failed!");
      });

  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex),
    });
  }
  render() {
    return (
      <SortableGallery axis={"xy"} photos={this.state.photos} onSortEnd={this.onSortEnd} />
    )
  }
}

export default GalleryCollection;
