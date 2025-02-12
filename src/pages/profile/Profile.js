import React, { useEffect, useState } from "react";
import "./Profile.scss";

import { useDispatch, useSelector } from "react-redux";
import { getUser, updatePhoto, updateUser } from "../../redux/features/auth/authSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { shortenText } from "../../utils";
// import Loader from "../../components/loader/Loader";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/dz0fe93tq/image/upload";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: user?.address || {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };
    // console.log(userData);
    await dispatch(updateUser(userData));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
        if(profileImage !== null && (profileImage.type === "image/jpg" || profileImage.type === 'image/png' || profileImage.type === 'image/jpeg')){
            const image = new FormData()
            image.append("file", profileImage)
            image.append("cloud_name", cloud_name)
            image.append("upload_preset", upload_preset)

            // save image to cloudinary
            const response = await fetch(url, {method: "post", body: image})
            const imgData = await response.json()
            console.log(imgData)
            imageURL = imgData.url.toString();
        }

        // save to Data base
        const userData  = {
            photo : profileImage ? imageURL : profile.photo
        }
        await dispatch(updatePhoto(userData))
        setImagePreview(null)
    } catch (error) {
        
    }
  };

  return (
    <section>
      <div className="container">
        <h1>Profile</h1>
        <div className="profile">
            {!isLoading && (
              <>
                <div className="profile-photo">
                  <div>
                    <img
                      src={imagePreview === null ? user?.photo : imagePreview}
                      alt="Profile Image"
                    />
                    <h3>Role: {profile.role}</h3>
                    {imagePreview !== null && (
                      <button
                        className="anmoBTN2 anmoBTN2WithFull"
                        onClick={savePhoto}
                      >
                        <AiOutlineCloudUpload size={18} /> Upload Photo
                      </button>
                    )}
                  </div>
                </div>
                <form onSubmit={saveProfile}>
                  <p>
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>
                  <p>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>
                  <p>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={profile?.address?.address}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      value={profile?.address?.state}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Country:</label>
                    <input
                      type="text"
                      name="country"
                      value={profile?.address?.country}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <button className="anmoBTN2 anmoBTN2WithFull">
                    Update Profile
                  </button>
                </form>
              </>
            )}
        </div>
      </div>
    </section>
  );
};

// export const UserProfile = () =>{
//   const {user} = useSelector((state)=> state.auth);

//   // const userName = user?.name || "...";
//   const userProfile = user?.photo || "...";
  
//   return(
//     <>
//       <img className="profileName" src={userProfile} alt="user Profile" />
//     {/* <span style={{color: "orange"}}>Hi, { shortenText(userName, 9)} |</span> */}
   
//     </>
//   )
// }


export default Profile;
