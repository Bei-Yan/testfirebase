import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';
import {buildImageURL} from '@/lib/azureblob/clientHelper';
import {checkInValidUser} from '@/lib/helper';
import {AppContext} from '@/context/AppContext';
import ReactLoading from 'react-loading';

function UserPosts() {
  const router = useRouter();
  const {setUser} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 5;
  const [maxPage, setMaxPage] = useState(1);
  const pagingPosts = function currentData(data, itemsPerPage) {
    const now = currentPage < 1 ? 0 : (currentPage - 1);
    const begin = now * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  useEffect(() => {
    if (checkInValidUser()) {
      setUser(undefined);
      alert('Token expired, redirect to Home page.');
      router.push('/');
      return;
    }
    const token = window.localStorage.getItem('AUTH_TOKEN');
    setLoading(true);
    fetch('/api/recipes', {
      headers: {
        'Authorization': token,
      },
      method: 'get',
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            router.push('/');
          }
        })
        .then((data) => {
          setLoading(false);
          if (data != undefined) {
            setData(data);
            setCount(Math.ceil(data.length / PER_PAGE));
            setMaxPage(Math.ceil(data.length / PER_PAGE));
          }
        });
  }, []);

  const handleChange = (_, p) => {
    const newPage = Math.min(p, maxPage);
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography aria-label="MyPostsTitle" variant="h3" component="div" gutterBottom sx={{fontFamily: 'monospace', color: '#008000'}}>
          My Posts
        </Typography>
        {
          isLoading ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh">
            <ReactLoading data-testid="loading" type={'spin'} color={'#008000'} width={'30%'}/>
          </Box> : (data == null ? <p></p> : postList(pagingPosts(data, PER_PAGE)))
        }
      </Box>
      <Box sx={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
      }}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            size="large"
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Container>
  );
}

function postList(list) {
  return (
    <Grid container spacing={5}>
      {list.map((post) => postComp(post))}
    </Grid>);
}

function postComp(post) {
  const router = useRouter();
  const token = window.localStorage.getItem('AUTH_TOKEN');

  const handleCardClick = (id) => {
    router.push(`/recipes/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/editrecipe/${id}`);
  };

  const handleDelete = (id) => {
    if (checkInValidUser()) {
      setUser(undefined);
      alert('Token expired, redirect to Home page.');
      router.push('/');
      return;
    }
    fetch(`/api/recipes/${id}`, {
      headers: {
        'Authorization': token,
      },
      method: 'delete',
    }).then(() => {
      router.reload();
    });
  };

  return (
    <Grid item key={post._id} xs={12}>
      <Card
        onClick={() => handleCardClick(post._id)}
        sx={{cursor: 'pointer'}}
        style={{height: '300px'}}
      >
        <Grid container >
          <Grid item sx={{height: {xs: '140px', sm: '140px', md: '300px'}}} xs={12} sm={12} md={4}>
            <CardMedia
              component='img'
              sx={{height: '100%', width: '100%', objectFit: 'fill'}}
              image={post.imageList.length == 0 ? '' : buildImageURL(post.imageList[0])}
              alt={post.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h5" component="div"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontWeight: 'bold',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontFamily: 'Arial',
                      color: 'green'
                  }}>
                    {post.name}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" component="div" sx={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
                {post.shortDescription}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box display="flex" sx={{margin: 1.2}} justifyContent="flex-end" >
              <Button variant="contained" style={{marginRight: 5, backgroundColor: '#009688'}} startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(post._id);
                }}
              >
              Edit
              </Button>
              <Button
                variant="contained"
                style={{backgroundColor: '#c62828'}}
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
              >
              Delete
              </Button>
              {/* add link to edit page here */}
            </Box>
          </Grid>
        </Grid>


      </Card>
    </Grid>
  );
}

export default UserPosts;
