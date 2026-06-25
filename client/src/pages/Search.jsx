import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'createdAt';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-slate-50/30'>
      {/* Sidebar Filter Panel */}
      <div className='md:w-80 bg-white border-b md:border-r border-slate-200/80 p-6 flex flex-col gap-8 shrink-0 md:min-h-screen shadow-sm'>
        <div>
          <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Filters</h2>
          <p className='text-xs text-slate-400 font-semibold mt-0.5'>Refine your home search</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          {/* Search Term */}
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Search Term
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='e.g., modern villa...'
              className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type Filters */}
          <div className='flex flex-col gap-2.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Transaction Type
            </label>
            <div className='flex flex-col gap-2'>
              {[
                { id: 'all', label: 'Rent & Sale', checked: sidebardata.type === 'all' },
                { id: 'rent', label: 'Rent', checked: sidebardata.type === 'rent' },
                { id: 'sale', label: 'Sale', checked: sidebardata.type === 'sale' },
                { id: 'offer', label: 'Special Offers', checked: sidebardata.offer },
              ].map(({ id, label, checked }) => (
                <label key={id} className='flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors'>
                  <input
                    type='checkbox'
                    id={id}
                    className='w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors cursor-pointer'
                    onChange={handleChange}
                    checked={checked}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities Filters */}
          <div className='flex flex-col gap-2.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Amenities
            </label>
            <div className='flex flex-col gap-2'>
              {[
                { id: 'parking', label: 'Parking spot', checked: sidebardata.parking },
                { id: 'furnished', label: 'Furnished space', checked: sidebardata.furnished },
              ].map(({ id, label, checked }) => (
                <label key={id} className='flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors'>
                  <input
                    type='checkbox'
                    id={id}
                    className='w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors cursor-pointer'
                    onChange={handleChange}
                    checked={checked}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-wider'>
              Sort By
            </label>
            <select
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              id='sort_order'
              className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-3 py-2.5 text-sm outline-none font-semibold text-slate-700 transition-all cursor-pointer'
            >
              <option value='createdAt_desc'>Latest Uploads</option>
              <option value='createdAt_asc'>Oldest Uploads</option>
              <option value='regularPrice_desc'>Price: High to Low</option>
              <option value='regularPrice_asc'>Price: Low to High</option>
            </select>
          </div>

          <button className='w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm uppercase tracking-wider'>
            Search
          </button>
        </form>
      </div>

      {/* Listing Results */}
      <div className='flex-1 flex flex-col'>
        <div className='p-6 px-8 border-b border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white shadow-sm'>
          <div>
            <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>
              Search Results
            </h1>
            <p className='text-xs text-slate-400 font-semibold mt-0.5'>Explore available high-end properties</p>
          </div>
          <span className='bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm w-fit border border-slate-200/40'>
            {listings.length} {listings.length === 1 ? 'estate' : 'estates'} found
          </span>
        </div>

        <div className='p-8 flex-1'>
          {loading && (
            <div className='flex flex-col items-center justify-center py-20 w-full gap-3'>
              <div className='w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin' />
              <p className='text-sm text-slate-400 font-bold'>Loading listings...</p>
            </div>
          )}

          {!loading && listings.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 text-center'>
              <span className='text-4xl mb-4'>🏠</span>
              <p className='text-lg font-bold text-slate-700'>No listings found</p>
              <p className='text-sm text-slate-400 mt-1 max-w-xs font-medium'>Try adjusting your filters or expanding your search term.</p>
            </div>
          )}

          {!loading && listings.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center'>
              {listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          {showMore && (
            <div className='w-full flex justify-center mt-12'>
              <button
                onClick={onShowMoreClick}
                className='bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 font-bold px-8 py-3 rounded-2xl shadow-sm hover:shadow transition-all duration-300 text-sm'
              >
                Load More Listings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}