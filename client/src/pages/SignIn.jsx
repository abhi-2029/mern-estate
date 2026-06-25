import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }   
  };

 

  return (
    <div className='max-w-md mx-auto my-16 p-8 bg-white border border-slate-200/50 rounded-3xl shadow-xl flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Welcome Back</h1>
        <p className='text-xs text-slate-400 font-semibold mt-1'>Sign in to manage your premium estates</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2'>
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
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <OAuth/>
      </form>

      <div className='flex items-center justify-center gap-1.5 text-sm pt-4 border-t border-slate-100/80'>
        <span className='text-slate-400 font-semibold'>New to Abhi Estate?</span>
        <Link to={"/sign-up"} className='text-indigo-600 hover:underline font-bold'>
          Create account
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
