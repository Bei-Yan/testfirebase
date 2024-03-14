import {RegisterForm} from '@components/register';
import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {AppContext} from '@/context/AppContext';
import {Box} from '@mui/material';
import ReactLoading from 'react-loading';

export default function RegisterPage() {
  const {user}=useContext(AppContext); // get user from AppContext
  const [loading, setLoading]=useState(true); // set loading state
  const router = useRouter();
  useEffect( ()=>{
    if (user !==undefined) { // if user is defined, redirect to home page
      router.push('/');
    }
    setInterval(() => { // simulate loading for 2 seconds
      setLoading(false);
    }, 2000);
  }, [user, loading]);

  if (loading) { // if still loading, display loading spinner
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        aria-label="LoadingDiv">
        <ReactLoading data-testid="loading" type={'spin'} color={'#008000'} width={'30%'}/>
      </Box>
    );
  }
  return <RegisterForm /> // otherwise, render the registration form
  ;
}
