import React, { Component } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";



class UploadImage extends Component {
    constructor() {
        super();
        this.state = {
            imageDestination: ""
        };
        this.imageElement = React.createRef();
    }

    componentDidMount() {
        const cropper = new Cropper(this.imageElement.current, {
            viewMode : 2,
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                this.setState({ imageDestination: canvas.toDataURL("image/png") });
            }
        });
    }

    render() {
        return (
            <div className="uploadImage col-sm-12  col-md-5 col-lg-4">
                <div className="conatiner ">
                    <div class="img-container">
                        <img ref={this.imageElement} className=" col-8" src='assets/images/bag_8.png' alt="Source" crossorigin />
                    </div>
                    <div className="img-preview d-flex justify-content-center  ">
                        <img src={this.state.imageDestination} className="col-8" alt="Destination" />
                    </div >

                    </div>
                </div>

                );
    }

}







                export default UploadImage