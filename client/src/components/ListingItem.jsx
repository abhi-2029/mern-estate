import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-slate-100 transition-all duration-300 overflow-hidden rounded-3xl w-full sm:w-[330px] flex flex-col'>
      <Link to={`/listing/${listing._id}`} className='flex flex-col h-full'>
        {/* Card Image section with floating badges */}
        <div className='relative overflow-hidden h-[220px]'>
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-full w-full object-cover hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute top-3 left-3 flex gap-2'>
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-md text-white ${listing.type === 'rent' ? 'bg-indigo-600' : 'bg-rose-600'}`}>
              For {listing.type}
            </span>
            {listing.offer && (
              <span className='bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-md'>
                Offer
              </span>
            )}
          </div>
        </div>

        {/* Content details section */}
        <div className='p-4 flex flex-col flex-1 gap-1.5 w-full'>
          <h4 className='truncate text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors'>
            {listing.name}
          </h4>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-emerald-600 shrink-0' />
            <p className='text-xs text-slate-500 truncate w-full font-medium'>
              {listing.address}
            </p>
          </div>
          <p className='text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed font-medium'>
            {listing.description}
          </p>

          <div className='flex items-center gap-1.5 mt-2'>
            <span className='text-emerald-600 font-extrabold text-lg'>
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
            </span>
            {listing.offer && (
              <span className='text-xs text-slate-400 line-through'>
                ${listing.regularPrice.toLocaleString('en-US')}
              </span>
            )}
            <span className='text-[10px] text-slate-400 font-semibold uppercase tracking-wider'>
              {listing.type === 'rent' && ' / month'}
            </span>
          </div>

          <div className='text-slate-500 flex gap-2 text-xs font-bold mt-auto pt-3 border-t border-slate-100/80'>
            <div className='bg-slate-50 border border-slate-150 px-2 py-1 rounded-lg flex items-center gap-1'>
              <span>🛏️</span> {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
            </div>
            <div className='bg-slate-50 border border-slate-150 px-2 py-1 rounded-lg flex items-center gap-1'>
              <span>🛁</span> {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}