
import React, { Component } from "react";
import { GrAdd } from "react-icons/gr";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from '@material-ui/core/Button';

class UploadImage extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { packImages } = this.props
        return (
            <div className="Upload-image">
                <div className="row ">
                    <div className="upload-input">
                        <div className="">
                            <button className="btn btn-null  ">
                                <input accept="image/*" className="col-12" ref="file" type="file" id="actual-btn" onChange={this.props.image} hidden />
                                <label className="" for="actual-btn">
                               <AiOutlineCloudUpload />
                                </label>
                            </button>
                        </div>

                    </div>       
                </div>
            </div>
        )

    }
}
export default UploadImage




