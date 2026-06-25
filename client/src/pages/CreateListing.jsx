import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(formData);

  // ✅ Upload images to Firebase
  const handleImageSubmit = () => {
    if (files.length === 0) {
      setImageUploadError('Please select at least one image to upload.');
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError('You can only upload a maximum of 6 images per listing.');
      return;
    }

    setUploading(true);
    setImageUploadError('');

    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        setFormData((prev) => ({
          ...prev,
          imageUrls: prev.imageUrls.concat(urls),
        }));
        setUploading(false);
      })
      .catch(() => {
        setImageUploadError('Image upload failed (2MB max per image).');
        setUploading(false);
      });
  };

  // ✅ Local Base64 image reader helper
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // ✅ Remove uploaded image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (['parking', 'furnished', 'offer'].includes(id)) {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (['number', 'text', 'textarea'].includes(type)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) {
      setError('You must upload at least one image.');
      return;
    }
    if (+formData.discountPrice >= +formData.regularPrice) {
      setError('Discount price must be lower than regular price.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser?._id || '',
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Something went wrong.');
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <main className='p-6 max-w-5xl mx-auto bg-white border border-slate-200/60 rounded-3xl shadow-xl my-10'>
      <div className='text-center my-6'>
        <h1 className='text-4xl font-extrabold text-slate-800 tracking-tight'>
          Create a Listing
        </h1>
        <p className='text-sm text-slate-400 font-semibold mt-2'>
          List your property on Abhi Estate and reach thousands of prospective buyers or renters
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row gap-8 mt-8'>
        {/* Left Column - Details */}
        <div className='flex flex-col gap-5 flex-1'>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Property Title</label>
            <input
              type='text'
              placeholder='E.g., Luxurious Penthouse in Downtown'
              className='bg-slate-50/50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700 placeholder-slate-400'
              id='name'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Description</label>
            <textarea
              placeholder='Describe the property features, neighborhood, and amenities...'
              className='bg-slate-50/50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700 placeholder-slate-400 min-h-[120px]'
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Address</label>
            <input
              type='text'
              placeholder='Full location address'
              className='bg-slate-50/50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700 placeholder-slate-400'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>

          {/* Checkbox Toggle Chips */}
          <div className='flex flex-col gap-2 mt-2'>
            <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Property Features</label>
            <div className='flex gap-3 flex-wrap'>
              {[
                { id: 'sale', label: 'Sell' },
                { id: 'rent', label: 'Rent' },
                { id: 'parking', label: 'Parking spot' },
                { id: 'furnished', label: 'Furnished' },
                { id: 'offer', label: 'Offer' },
              ].map(({ id, label }) => {
                const isChecked = id === 'sale' || id === 'rent' ? formData.type === id : formData[id];
                return (
                  <label
                    key={id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 select-none ${
                      isChecked
                        ? 'border-indigo-500 bg-indigo-50/20 text-indigo-700 font-bold'
                        : 'border-slate-200/80 bg-slate-50/10 text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50/30'
                    }`}
                  >
                    <input
                      type='checkbox'
                      id={id}
                      className='hidden'
                      onChange={handleChange}
                      checked={isChecked}
                    />
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                        </svg>
                      )}
                    </div>
                    <span className='text-sm'>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Numeric Specifications */}
          <div className='flex flex-wrap gap-4 bg-slate-50/30 p-5 rounded-2xl border border-slate-100 mt-2'>
            <div className='flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm'>
              <span className='text-xs text-slate-400 font-bold uppercase tracking-wider'>Beds</span>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='w-10 bg-transparent text-base font-extrabold text-slate-700 outline-none text-center border-b border-dashed border-slate-300 focus:border-indigo-500'
                onChange={handleChange}
                value={formData.bedrooms}
              />
            </div>

            <div className='flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm'>
              <span className='text-xs text-slate-400 font-bold uppercase tracking-wider'>Baths</span>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='w-10 bg-transparent text-base font-extrabold text-slate-700 outline-none text-center border-b border-dashed border-slate-300 focus:border-indigo-500'
                onChange={handleChange}
                value={formData.bathrooms}
              />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-[150px]'>
              <div className='flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-50'>
                <span className='text-xs text-slate-400 font-bold uppercase tracking-wider'>Price</span>
                <span className='text-slate-400 font-extrabold text-sm'>$</span>
                <input
                  type='number'
                  id='regularPrice'
                  min='50'
                  max='10000000'
                  required
                  className='bg-transparent text-sm font-extrabold text-slate-700 outline-none w-full border-b border-dashed border-slate-300 focus:border-indigo-500'
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                {formData.type === 'rent' && (
                  <span className='text-[10px] text-slate-400 font-bold whitespace-nowrap uppercase tracking-wider'>/ mo</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className='flex flex-col gap-1 flex-1 min-w-[150px]'>
                <div className='flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-50'>
                  <span className='text-xs text-rose-500 font-bold uppercase tracking-wider'>Discount</span>
                  <span className='text-rose-500 font-extrabold text-sm'>$</span>
                  <input
                    type='number'
                    id='discountPrice'
                    min='0'
                    max='10000000'
                    required
                    className='bg-transparent text-sm font-extrabold text-slate-700 outline-none w-full border-b border-dashed border-slate-300 focus:border-indigo-500'
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  {formData.type === 'rent' && (
                    <span className='text-[10px] text-slate-400 font-bold whitespace-nowrap uppercase tracking-wider'>/ mo</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Images & Submit */}
        <div className='flex flex-col lg:w-[400px] gap-6'>
          {/* Custom Upload Dropzone */}
          <div className='flex flex-col gap-2'>
            <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Upload Images</label>
            <div className='border-2 border-dashed border-slate-200 hover:border-indigo-500 bg-slate-50/30 hover:bg-indigo-50/10 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center gap-3 group relative cursor-pointer'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                type='file'
                id='images'
                accept='image/*'
                multiple
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100 transition-all duration-300 text-indigo-600'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-7 h-7'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                </svg>
              </div>
              <div className='text-center'>
                <p className='text-sm font-bold text-slate-700'>Click to select images</p>
                <p className='text-xs text-slate-400 font-semibold mt-1'>
                  {files.length > 0 ? `${files.length} file(s) selected` : 'Select up to 6 images (first is cover)'}
                </p>
              </div>
            </div>
            <button
              type='button'
              disabled={uploading || files.length === 0}
              onClick={handleImageSubmit}
              className='mt-1 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:shadow-none uppercase tracking-wider text-xs'
            >
              {uploading ? 'Processing & Uploading...' : 'Upload Selected Files'}
            </button>
          </div>

          {imageUploadError && (
            <p className='text-rose-600 bg-rose-50 border border-rose-100 text-xs font-semibold px-4 py-2.5 rounded-xl'>{imageUploadError}</p>
          )}

          {/* Uploaded Image Gallery Grid */}
          {formData.imageUrls.length > 0 && (
            <div className='flex flex-col gap-2'>
              <label className='text-xs text-slate-400 font-bold uppercase tracking-wider pl-1'>Image Gallery</label>
              <div className='grid grid-cols-3 gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100'>
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className='relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md'
                  >
                    <img
                      src={url}
                      alt='listing'
                      className='w-full h-full object-cover'
                    />
                    {index === 0 && (
                      <span className='absolute top-1 left-1 bg-indigo-600 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm tracking-wider'>
                        Cover
                      </span>
                    )}
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300'
                    >
                      <div className='p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-4 h-4'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='m14.74 9-.34 6m-4.78 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
                        </svg>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Action Button */}
          <button
            disabled={loading || uploading}
            className='w-full p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-extrabold rounded-2xl shadow-xl shadow-slate-100 hover:shadow-slate-200 hover:from-slate-900 hover:to-black transform hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300 uppercase tracking-wider text-xs disabled:opacity-50 disabled:hover:-translate-y-0 mt-4'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>

          {error && (
            <p className='text-rose-600 bg-rose-50 border border-rose-100 text-xs font-semibold px-4 py-2.5 rounded-xl'>{error}</p>
          )}
        </div>
      </form>
    </main>
  );
}
