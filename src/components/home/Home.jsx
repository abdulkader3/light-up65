import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useState, createRef, useEffect } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { MdCancelPresentation, MdSave } from 'react-icons/md';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

export const Home = () => {
  // React state
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const cropperRef = createRef();

  // Redux state
  const currentUserData = useSelector((state) => state.counter.value);

  // Firebase storage and auth
  const storage = getStorage();
  const auth = getAuth();

  // Handle file input change
  const onChange = (e) => {
    e.preventDefault();
    const files = e.target.files || e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // Crop the image
  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      setCropData(croppedCanvas.toDataURL());
      console.log('Crop data generated:', croppedCanvas.toDataURL()); // Debugging
    }
  };

  // Save the cropped image and update Firebase profile
  const handleSave = async () => {
    if (!cropData) {
      console.log('No crop data available to save.');
      return;
    }

    try {
      // Ensure the user is authenticated before updating the profile
      const user = auth.currentUser;
      if (!user) {
        console.error('User is not authenticated.');
        return;
      }

      console.log('User is authenticated:', user);

      // Upload cropped image to Firebase Storage
      const storageRef = ref(storage, `userPhotos/${user.uid}.png`); // Ensure unique path with user.uid
      await uploadString(storageRef, cropData, 'data_url');

      console.log('Image uploaded to Firebase Storage.');

      // Get download URL of the uploaded image
      const url = await getDownloadURL(storageRef);
      console.log('Image URL:', url);

      // Update the user's profile with the new image URL
      await updateProfile(user, { photoURL: url });
      console.log('Profile updated with new photo URL.');

      // Update the local Redux state for immediate UI feedback (optional)
      // Assuming you have an action to update user profile
      // dispatch(updateUserProfile({ photoURL: url }));

      // Reload to reflect changes (consider removing this if not necessary)
      location.reload();
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  // Authentication listener to handle user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
      } else {
        console.log("No user logged in");
      }
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, [auth]);

  return (
    <>
      <section className="relative w-full h-screen flex justify-center items-center">
        <div className="max-w-sm mx-auto bg-[#074173] shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="h-40">
            <img
              className="w-full h-full object-cover"
              src="https://via.placeholder.com/800x400.png?text=Cover+Photo"
              alt="Cover"
            />
          </div>
          <div onClick={() => setShow(true)} className="flex justify-center relative">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-white transform transition duration-500 hover:scale-110"
              src={currentUserData?.photoURL}
              alt="Profile"
            />
            <div className="absolute right-[35%] bottom-0 text-white text-xl bg-[#074173] p-2 rounded-full">
              <FaRegPenToSquare />
            </div>
          </div>
          <div className="text-center px-6 py-4">
            <h2 className="text-2xl text-white leading-7 tracking-wider font-extrabold font-sevillana">
              {currentUserData?.displayName}
            </h2>
            <div className="flex justify-center items-center text-black mt-1">
              <FaEnvelope className="mr-2 text-white" />
              <p className="text-white font-poppins">{currentUserData?.email}</p>
            </div>
            <div className="flex justify-center items-center text-black">
              <FaPhone className="mr-2 text-white" />
              <p className="text-white font-poppins">(+880) 01706226996</p>
            </div>
          </div>
        </div>
        {show && (
          <div className="absolute top-0 right-[50%] translate-x-[50%] bg-black bg-opacity-50 w-[800px] h-screen flex justify-center items-start">
            <div className="bg-white p-5">
              <div className="flex justify-between items-center">
                <button onClick={handleSave} className="text-3xl text-[#074173] active:scale-110">
                  <MdSave />
                </button>
                <button onClick={() => setShow(false)} className="text-3xl text-[#074173] active:scale-110">
                  <MdCancelPresentation />
                </button>
              </div>
              <div style={{ width: '100%' }}>
                <input type="file" onChange={onChange} />
                <br />
                <br />
                <Cropper
                  ref={cropperRef}
                  style={{ height: 300, width: '400px' }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
              </div>
              <div>
                <div className="box" style={{ width: '100%', float: 'right' }}>
                  <h1>
                    <span>Crop</span>
                    <button style={{ float: 'right' }} onClick={getCropData}>
                      Crop Image
                    </button>
                  </h1>
                  <img style={{ width: '100px' }} src={cropData} alt="cropped" />
                </div>
              </div>
              <br style={{ clear: 'both' }} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
