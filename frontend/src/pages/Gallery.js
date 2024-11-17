import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const baseUrl = process.env.REACT_APP_API_URL;
const baseFileUrl = process.env.REACT_APP_IMAGE_URL;

const Gallery = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalSize, setModalSize] = useState('lg'); // Control modal size

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsResponse = await axios.get(`${baseUrl}/collections`);
        const collectionsData = collectionsResponse.data;

        // Fetch photos for each collection
        const collectionsWithPhotos = await Promise.all(
          collectionsData.map(async (collection) => {
            const photosResponse = await axios.get(`${baseUrl}/photos?collection_id=${collection.id}`);
            return {
              ...collection,
              photos: photosResponse.data,
            };
          })
        );

        setCollections(collectionsWithPhotos);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the collections!", error);
        setError("Failed to load collections. Please try again later.");
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setCurrentPhotoIndex(0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollection(null);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % selectedCollection.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + selectedCollection.photos.length) % selectedCollection.photos.length);
  };

  const handleResizeModal = (size) => {
    setModalSize(size);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gallery</h2>

      {/* Loading Message */}
      {loading && <p className="text-center">Loading collections...</p>}

      {/* Error Message */}
      {error && !loading && <p className="text-center text-danger">{error}</p>}

      {/* Collections List */}
      {!loading && !error && (
        <div className="row">
          {collections.map((collection, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100" onClick={() => handleCollectionClick(collection)}>
                {collection.photos.length > 0 && (
                  <img
                    src={`${baseFileUrl}${collection.photos[0].large_image}`}
                    className="card-img-top"
                    alt={collection.name}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center">{collection.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photos Modal */}
      {selectedCollection && (
        <Modal show={showModal} onHide={handleCloseModal} centered size={modalSize}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCollection.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={`${baseFileUrl}${selectedCollection.photos[currentPhotoIndex].large_image}`}
              alt={selectedCollection.photos[currentPhotoIndex].title}
              className="img-fluid rounded"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2 mt-2">
              <h5>{selectedCollection.photos[currentPhotoIndex].title}</h5>
              <p>{selectedCollection.photos[currentPhotoIndex].description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePrevPhoto}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextPhoto}>
              Next
            </Button>
            <Button variant="info" onClick={() => handleResizeModal('sm')}>
              Small
            </Button>
            <Button variant="info" onClick={() => handleResizeModal('lg')}>
              Large
            </Button>
            <Button variant="info" onClick={() => handleResizeModal('xl')}>
              Extra Large
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;