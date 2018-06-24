import React from 'react';
import async from '../async'
import { Divider } from 'antd';

let GalleryCollection = async(() => import("./GalleryCollection"));
let EvolvedGallery = async(() => import("./EvolvedGallery"));


class GalleryPage extends React.Component {
    render() {
        return (
            // <div>
            //     <h1>Gallery</h1>
            //     <Divider />
            //     <div>
            //         <EvolvedGallery />
            //     </div>
            // </div>
            <EvolvedGallery />

        )
    }
}

export default GalleryPage