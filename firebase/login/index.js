import {LoginForm} from '@components/login';
import React, {useContext} from 'react';
import {GoogleLogin} from '@/components/login/google';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {AppContext} from '@/context/AppContext';
import {Box} from '@mui/material';
import ReactLoading from 'react-loading';

export default function LoginPage() {
  const {user}=useContext(AppContext);

  // Define loading state and set it to true by default
  const [loading, setLoading]=useState(true);

  const router = useRouter();

  // When the user changes or the loading state changes, check if user is defined and redirect to homepage if they are
  useEffect(() => {
    if (user !==undefined) {
      router.push('/');
    }
    // Set loading to false after 2 seconds
    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, [user, loading]);

  // If loading is true, display a loading spinner
  if (loading) {
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

  // If loading is false, display the login form and Google login button
  return (
    <div>
      <LoginForm />
      <GoogleLogin />
    </div>
  );
}
