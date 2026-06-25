import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }   
  };

 

  return (
    <div className='max-w-md mx-auto my-16 p-8 bg-white border border-slate-200/50 rounded-3xl shadow-xl flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Create Account</h1>
        <p className='text-xs text-slate-400 font-semibold mt-1'>Join Sahand Estate to find your perfect place</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
        <input
          type='text'
          placeholder='Username'
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          id='username'
          onChange={handleChange}
          required
        />

        <input
          type='email'
          placeholder='Email address'
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          id='email'
          onChange={handleChange}
          required
        />

        <input
          type='password'
          placeholder='Password'
          className='bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 w-full font-semibold text-slate-700'
          id='password'
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className='w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm uppercase tracking-wider disabled:opacity-85'
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <OAuth/>
      </form>

      <div className='flex items-center justify-center gap-1.5 text-sm pt-4 border-t border-slate-100/80'>
        <span className='text-slate-400 font-semibold'>Already have an account?</span>
        <Link to={"/sign-in"} className='text-indigo-600 hover:underline font-bold'>
          Sign In
        </Link>
      </div>
      {error && (
        <div className='bg-red-50 border border-red-200 rounded-xl p-3 mt-2 text-center text-xs font-bold text-red-600'>
          {error}
        </div>
      )}
    </div>
  );
}
