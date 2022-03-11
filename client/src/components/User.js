import React, { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';

function User() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = () => {
    setLoading(true);
    axios
      .get('api/user')
      .then((response) => {
        const data = response.data;
        setTimeout(() => {
          setPosts(data.reverse());
          setLoading(false);
        }, 1850);

        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  };

  const submit = (event) => {
    event.preventDefault();

    const today = new Date();
    const date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const payload = {
      date: date,
      time: time,
      name: name,
      location: location,
      body: body,
    };

    axios({
      url: 'api/user',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        resetForm();
        getUserPosts();
      })
      .catch((err) => {
        console.log('Internal server error', err);
      });
  };

  const displayUserPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <div className="left">
          <div className="name">
            <h3>
              {post.location} | {post.date}
            </h3>
            <h4>@{post.name}</h4>
          </div>
        </div>

        <div className="post">
          <p>{post.body}</p>
        </div>
      </div>
    ));
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setBody('');
  };

  return (
    <div className="user">
      <div className="user__nav">
        <h1>User Dashboard</h1>

        <div className="right__nav-two">
          <Link className="user-link-back" to="/">
            Back To Home
          </Link>
        </div>
      </div>
      <div className="form">
        <form onSubmit={submit}>
          <div className="form-input">
            <input
              required="true"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              required="true"
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <textarea
              required="true"
              type="text"
              name="body"
              placeholder="How's Covid-19 situation in your area?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <button className="btn">
            {loading && (
              <Loader className="loading" type="ThreeDots" color="#fff" />
              // <Loading />
            )}
            {!loading && 'Submit'}
          </button>
        </form>
      </div>

      <div className="blog-">{displayUserPosts(posts)}</div>
    </div>
  );
}

export default User;
