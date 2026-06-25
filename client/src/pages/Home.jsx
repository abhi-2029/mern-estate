import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerData, rentData, saleData] = await Promise.all([
          fetch('/api/listing/get?offer=true&limit=4').then((res) => res.json()),
          fetch('/api/listing/get?type=rent&limit=4').then((res) => res.json()),
          fetch('/api/listing/get?type=sale&limit=4').then((res) => res.json()),
        ]);
        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className='pb-12 bg-slate-50/50'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-transparent'>
        {/* Decorative background gradients */}
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl -z-10' />

        <div className='flex flex-col gap-6 py-24 px-6 max-w-6xl mx-auto text-center sm:text-left'>
          <span className='self-center sm:self-start bg-indigo-50 border border-indigo-200/40 text-indigo-600 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm'>
            ✨ Premium Estates & Living Spaces
          </span>
          <h1 className='text-slate-800 font-extrabold text-4xl lg:text-7xl leading-tight tracking-tight'>
            Find your next <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>perfect</span>
            <br />
            place with ease
          </h1>
          <p className='text-slate-500 text-sm sm:text-base max-w-xl font-medium leading-relaxed'>
            Sahand Estate is the premier destination to discover high-end living spaces.
            Browse from curated listings and contact landlords instantly.
          </p>
          <div className='flex flex-wrap gap-4 mt-2 justify-center sm:justify-start'>
            <Link
              to='/search'
              className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base'
            >
              Start Searching
            </Link>
            <Link
              to='/about'
              className='bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-2xl shadow-sm hover:shadow transition-all duration-300 text-sm sm:text-base'
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Swiper Slider Section */}
      <div className='max-w-6xl mx-auto px-6 -mt-8 relative z-10'>
        <Swiper navigation className='rounded-3xl overflow-hidden shadow-2xl border border-white/80'>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.65)), url(${listing.imageUrls?.[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[480px] relative flex items-end p-8 sm:p-12'
                >
                  <div className='text-white max-w-lg'>
                    <span className='bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block'>
                      Special Offer
                    </span>
                    <h3 className='text-2xl sm:text-3xl font-bold mb-2 drop-shadow-md'>{listing.name}</h3>
                    <p className='text-sm text-slate-200 truncate mb-4 drop-shadow-sm'>{listing.address}</p>
                    <Link to={`/listing/${listing._id}`} className='inline-flex items-center text-xs font-bold uppercase tracking-wider text-white hover:underline gap-1.5'>
                      View Details →
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listings Section */}
      <div className='max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16'>
        {/* Offer Listings */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='mb-6 flex items-end justify-between border-b border-slate-200/60 pb-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
                  Exclusive Offers
                </h2>
                <p className='text-xs sm:text-sm text-slate-400 font-medium mt-1'>Curated listings with special pricing</p>
              </div>
              <Link
                className='text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'
                to={'/search?offer=true'}
              >
                Show more offers →
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Listings */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='mb-6 flex items-end justify-between border-b border-slate-200/60 pb-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
                  Recent places for rent
                </h2>
                <p className='text-xs sm:text-sm text-slate-400 font-medium mt-1'>Find your perfect temporary home</p>
              </div>
              <Link
                className='text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'
                to={'/search?type=rent'}
              >
                Show more places for rent →
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='mb-6 flex items-end justify-between border-b border-slate-200/60 pb-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
                  Recent places for sale
                </h2>
                <p className='text-xs sm:text-sm text-slate-400 font-medium mt-1'>Invest in your future premium home</p>
              </div>
              <Link
                className='text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'
                to={'/search?type=sale'}
              >
                Show more places for sale →
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
