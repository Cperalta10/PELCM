import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadAction";

const PostShare = () => {
    const dispatch = useDispatch();
    const { existingUser } = useSelector((state) => state.authReducer.authData);
    const [image, setImage] = useState(null);
    const desc = useRef();

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img);
        }
    };

    const imageRef = useRef();

    // const handleUpload = (e) => {
    //     e.preventDefault();

    //     const newPost = {
    //         userId: existingUser._id,
    //         desc: desc.current.value,
    //     };

    //     if (image) {
    //         const data = new FormData();
    //         const filename = Date.now() + image.name;
    //         data.append("name", filename);
    //         data.append("file", image);
    //         newPost.image = filename;
    //         console.log(newPost);
    //         try {
    //             dispatch(uploadImage(data));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };

    const handleUpload = async (e) => {
        e.preventDefault();

        //post data
        const newPost = {
            userId: existingUser._id,
            desc: desc.current.value,
        };

        // if there is an image with post
        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        // dispatch(uploadPost(newPost));
        // resetShare();
    };

    return (
        <div className="PostShare">
            <img src={ProfileImage} alt="" />
            <div>
                <input
                    ref={desc}
                    required
                    type="text"
                    placeholder="What's happening"
                />
                <div className="postOptions">
                    <div
                        className="option"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option" style={{ color: "var(--video)" }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div
                        className="option"
                        style={{ color: "var(--location)" }}
                    >
                        <UilLocationPoint />
                        Location
                    </div>
                    <div
                        className="option"
                        style={{ color: "var(--schedule)" }}
                    >
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className="button ps-button" onClick={handleUpload}>
                        Share
                    </button>
                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            // name="myImage"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
