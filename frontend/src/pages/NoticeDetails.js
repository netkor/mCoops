import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const NoticeDetails = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`${baseUrl}/notices/${id}`);
        setNotice(response.data);
        setLoading(false);
      } catch (error) {
        setError('There was an error fetching the notice!');
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      {notice && (
        <div className="card h-100 shadow-sm">
          <img src={`${imageUrl}${notice.image}`} className="card-img-top" alt={notice.title} />
          <div className="card-body">
            <h5 className="card-title">{notice.title}</h5>
            <p className="card-text">{notice.description}</p>
            <p className="card-text"><small className="text-muted">Posted on: {new Date(notice.created_at).toLocaleDateString()}</small></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeDetails;