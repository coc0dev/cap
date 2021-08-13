import React, {useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import firebase, { storage } from '../firebase'


export const Profile = () => {
    const {currentUser} = useAuth();
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    
    useEffect(() => {
        setUrl(currentUser.image)
    }, [currentUser.image])
    
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${currentUser.id}/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                // console.log(error);
            },
            () => {
                // console.log('test')
                storage
                .ref("images")
                .child(currentUser.id)
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // console.log(url)
                    // console.log('hello')
                    setUrl(url)
                    // currentUser.image = url;
                });
            }
        );
    };

    // console.log('image: ', image)

    const handleClick = (event) => {
        // console.log(url)
        event.preventDefault();

        const formData = {
            firstName: event.target.first_name.value,
            lastName: event.target.last_name.value,
            username: event.target.username.value,
            image: url,
            profileImage: url,
        }
        firebase.firestore().collection('users').doc(currentUser.id).set(formData)
        
            .then((docRef) => {  
                // console.log('profile updated.');
            })
            .catch(err => console.error(err))
            event.target.reset()
            // console.log(formData)

    }
        return (
            <div className="container">
                <h3 className="text-2xl mb-3">
                    Profile | Welcome {currentUser.firstName}
                </h3>
                <hr className="mb-4"/>

                <div className="row offset-3">
                    <div className="col-md-4">
                        <img id="myimg" className="img-fluid" key={url}  src={url} alt="profile" />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="file" onChange={handleChange} id="image" className="form-control-file mb-1" name="profile_image" />
                                        <button className="btn btn-secondary" onClick={handleUpload}>Upload</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-8">
                        <form onSubmit={(e) => handleClick(e)} action="" method="POST" encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="firstName" placeholder="First Name" name="first_name" defaultValue={currentUser.firstName} />
                                    </div>
                                </div>
                            </div>
                                <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" name="last_name" defaultValue={currentUser.lastName} />
                                    </div>
                                </div>
                                </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="username" className="form-control" placeholder="Username" id="username" name="username" defaultValue={currentUser.username} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="submit" id="update" className="btn btn-info btn-block" value="Update Profile" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}