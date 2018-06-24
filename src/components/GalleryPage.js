import React from 'react';
import async from '../async'

let EvolvedGallery = async(() => import("./EvolvedGallery"));


class GalleryPage extends React.Component {
    render() {
        return (
            <EvolvedGallery />
        )
    }
}

export default GalleryPage
