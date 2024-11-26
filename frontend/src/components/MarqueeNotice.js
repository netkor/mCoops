import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBullhorn } from 'react-icons/fa'; // Importing an icon from react-icons

const baseUrl = process.env.REACT_APP_API_URL;

function MarqueeNotice() {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/notices/`)
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the notices!", error);
      });
  }, []);

  const handleNoticeClick = (id) => {
    navigate(`/notice/${id}`);
  };

  return (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', backgroundColor: 'red', padding: '10px' }}>
      <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite' }}>
        {notices.map(notice => (
          <span
            key={notice.id}
            onClick={() => handleNoticeClick(notice.id)}
            style={{ cursor: 'pointer', marginRight: '50px', color: 'white', fontWeight: 'bold' }}
          >
            <FaBullhorn style={{ marginRight: '10px' }} />
            {notice.title}
          </span>
        ))}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}

export default MarqueeNotice;