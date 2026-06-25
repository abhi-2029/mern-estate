import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // ✅ Fetch listing by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (!res.ok || data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main className='bg-slate-50/20 min-h-screen pb-20'>
      {/* ✅ Loading and Error States */}
      {loading && (
        <div className='flex flex-col items-center justify-center min-h-[50vh] gap-3'>
          <div className='w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin' />
          <p className='text-sm text-slate-400 font-bold'>Loading property details...</p>
        </div>
      )}
      {error && (
        <div className='flex flex-col items-center justify-center min-h-[50vh] text-center px-4'>
          <span className='text-4xl mb-4'>⚠️</span>
          <p className='text-lg font-bold text-slate-700'>Something went wrong</p>
          <p className='text-sm text-slate-400 mt-1 max-w-xs font-semibold'>Please refresh the page and try again.</p>
        </div>
      )}

      {/* ✅ Listing Display */}
      {listing && !loading && !error && (
        <div>
          {/* ✅ Swiper for images */}
          <Swiper navigation className='h-[460px] sm:h-[520px] shadow-md'>
            {listing.imageUrls?.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='h-full w-full'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating Share Link Button */}
          <button
            className='fixed bottom-6 right-6 z-40 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:shadow-xl hover:-translate-y-1'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            title="Copy Link"
          >
            <FaShare className='h-4 w-4' />
          </button>

          {copied && (
            <p className='fixed bottom-20 right-6 z-40 rounded-xl bg-slate-900 text-white font-bold text-xs p-3 shadow-xl transition-all duration-300 animate-bounce'>
              Link copied to clipboard!
            </p>
          )}

          {/* ✅ Listing Details Card */}
          <div className='max-w-4xl mx-auto px-6 relative'>
            <div className='flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 -mt-16 relative z-10'>
              
              {/* Header Info */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
                  {listing.name}
                </h1>
                <div className='flex items-baseline gap-1.5 shrink-0'>
                  <span className='text-emerald-600 font-extrabold text-2xl sm:text-3xl'>
                    $
                    {listing.offer
                      ? listing.discountPrice.toLocaleString('en-US')
                      : listing.regularPrice.toLocaleString('en-US')}
                  </span>
                  <span className='text-xs text-slate-500 font-bold uppercase tracking-wider'>
                    {listing.type === 'rent' && ' / month'}
                  </span>
                </div>
              </div>

              {/* Address Map Marker */}
              <div className='flex items-center gap-2 text-slate-500 text-sm font-semibold'>
                <FaMapMarkerAlt className='text-emerald-600 h-4 w-4 shrink-0' />
                <span>{listing.address}</span>
              </div>

              {/* Transaction Badges */}
              <div className='flex flex-wrap gap-3 mt-1'>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${listing.type === 'rent' ? 'bg-indigo-600' : 'bg-rose-600'}`}>
                  For {listing.type}
                </span>
                {listing.offer && (
                  <span className='bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm'>
                    ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <div className='mt-2 flex flex-col gap-2'>
                <h3 className='font-extrabold text-slate-800 text-base'>Property Description</h3>
                <p className='text-slate-500 text-sm leading-relaxed font-semibold'>{listing.description}</p>
              </div>

              {/* Amenities Specifications Grid */}
              <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-6 border-t border-slate-100'>
                {[
                  { icon: <FaBed />, text: listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed` },
                  { icon: <FaBath />, text: listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath` },
                  { icon: <FaParking />, text: listing.parking ? 'Parking spot' : 'No Parking' },
                  { icon: <FaChair />, text: listing.furnished ? 'Furnished' : 'Unfurnished' },
                ].map(({ icon, text }, idx) => (
                  <li key={idx} className='bg-slate-50/50 border border-slate-150 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm text-center'>
                    <span className='text-indigo-600 text-xl'>{icon}</span>
                    <span className='text-xs font-bold text-slate-600'>{text}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Button */}
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm uppercase tracking-wider'
                  >
                    Contact landlord
                  </button>
                )}

              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
