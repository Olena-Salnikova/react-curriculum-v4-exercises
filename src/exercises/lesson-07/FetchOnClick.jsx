import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    setLoading(true); // Show loading state
    setError(null); // Clear previous errors
    setPost(null); // Clear previous post data
    try {
      const data = await getSinglePost(1); // id = 1
      setPost(data);
    } catch {
      setError('Failed to fetch post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={fetchPost}>
        Get post
      </button>
      <div className="content">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )}
        {!loading && !error && !post && (
          <div>
            Click the button to fetch the post data and display it here.
          </div>
        )}
      </div>
    </div>
  );
}
