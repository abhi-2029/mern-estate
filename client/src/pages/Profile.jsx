import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // ✅ Automatically upload when file selected
  useEffect(() => {
    if (file) handleFileUpload(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // ✅ Firebase image upload with progress
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '_' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('Upload error:', error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
          setFileUploadError(false);
        });
      }
    );
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message || 'Update failed'));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  // ✅ Delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  // ✅ Sign out user
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };

  // ✅ Fetch user's listings
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (err) {
      console.error('Error showing listings:', err);
      setShowListingsError(true);
    }
  };

  // ✅ Delete a specific listing
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        console.error('Listing delete failed:', data.message);
        return;
      }

      setUserListings((prev) => prev.filter((l) => l._id !== listingId));
    } catch (err) {
      console.error('Error deleting listing:', err.message);
    }
  };

  return (
    <div className='max-w-xl mx-auto my-16 p-8 bg-white border border-slate-200/50 rounded-3xl shadow-xl flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Account Settings</h1>
        <p className='text-xs text-slate-400 font-semibold mt-1'>Update your profile or manage your active listings</p>
      </div>

      {/* ✅ Profile Update Form */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-4 border-indigo-50 shadow-md hover:border-indigo-500 transition-all duration-300'
        />

        <p className='text-xs self-center font-bold mt-1'>
          {fileUploadError ? (
            <span className='text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200'>
              Upload Failed (must be under 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200'>Avatar uploaded successfully!</span>
          ) : null}
        </p>

        <input
          type='text'
          placeholder='Username'
          id='username'
          defaultValue={currentUser.username}
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          defaultValue={currentUser.email}
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='New password'
          id='password'
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm uppercase tracking-wider disabled:opacity-85'
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>

        <Link
          to='/create-listing'
          className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm uppercase tracking-wider text-center'
        >
          Create Listing
        </Link>
      </form>

      {/* ✅ Account Actions */}
      <div className='flex justify-between items-center text-sm font-semibold pt-4 border-t border-slate-100/80'>
        <span
          onClick={handleDeleteUser}
          className='text-rose-600 cursor-pointer hover:underline'
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className='text-slate-400 hover:text-slate-600 cursor-pointer hover:underline'
        >
          Sign out
        </span>
      </div>

      {/* ✅ Status Messages */}
      {error && (
        <div className='bg-rose-50 border border-rose-200 rounded-xl p-3 mt-2 text-center text-xs font-bold text-red-600'>
          {error}
        </div>
      )}
      {updateSuccess && (
        <div className='bg-emerald-50 border border-emerald-200 rounded-xl p-3 mt-2 text-center text-xs font-bold text-emerald-600'>
          User updated successfully!
        </div>
      )}

      {/* ✅ Listings Section */}
      <button
        onClick={handleShowListings}
        className='w-full mt-6 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow transition-all duration-300 text-sm'
      >
        Show My Listings
      </button>

      {showListingsError && (
        <p className='text-rose-600 text-center text-xs font-bold mt-3'>Error loading listings</p>
      )}

      {userListings.length > 0 && (
        <div className='flex flex-col gap-4 mt-8 pt-8 border-t border-slate-100'>
          <h2 className='text-xl font-extrabold text-slate-800 tracking-tight'>
            Your Property Listings
          </h2>
          <div className='flex flex-col gap-3'>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='border border-slate-150 rounded-2xl p-4 bg-slate-50/50 flex justify-between items-center gap-4 hover:shadow-sm transition-shadow'
              >
                <Link to={`/listing/${listing._id}`} className='shrink-0'>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-cover rounded-xl border border-slate-200 shadow-sm'
                  />
                </Link>
                <Link
                  to={`/listing/${listing._id}`}
                  className='text-slate-700 font-bold hover:text-indigo-600 truncate flex-1 text-sm'
                >
                  {listing.name}
                </Link>
                <div className='flex gap-3 shrink-0'>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='bg-white border border-slate-200 hover:bg-slate-50 text-emerald-600 font-bold py-2 px-3.5 rounded-xl text-xs shadow-sm hover:shadow transition-all uppercase tracking-wider'>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 font-bold py-2 px-3.5 rounded-xl text-xs shadow-sm hover:shadow transition-all uppercase tracking-wider'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
