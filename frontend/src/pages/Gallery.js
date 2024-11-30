import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;
const baseFileUrl = process.env.REACT_APP_IMAGE_URL;

const Gallery = () => {
  const [collections, setCollections] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsResponse = await axios.get(`${baseUrl}/collections`);
        setCollections(collectionsResponse.data);
      } catch (error) {
        setError('There was an error fetching the collections.');
      }
    };

    const fetchPhotos = async () => {
      try {
        const photosResponse = await axios.get(`${baseUrl}/photos`);
        setPhotos(photosResponse.data);
      } catch (error) {
        setError('There was an error fetching the photos.');
      }
    };

    Promise.all([fetchCollections(), fetchPhotos()]).then(() => setLoading(false));
  }, []);

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setCurrentPhotoIndex(0);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedCollection(null);
  };

  const handleNextPhoto = () => {
    if (selectedCollection) {
      const collectionPhotos = photos.filter(photo => photo.collections.includes(selectedCollection.id));
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % collectionPhotos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedCollection) {
      const collectionPhotos = photos.filter(photo => photo.collections.includes(selectedCollection.id));
      setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + collectionPhotos.length) % collectionPhotos.length);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center">Gallery</h2>

      {/* Loading Message */}
      {loading && <p className="text-center">Loading collections...</p>}

      {/* Error Message */}
      {error && !loading && <p className="text-center text-danger">{error}</p>}

      {/* Collections List */}
      {!loading && !error && (
        <div className="row g-4">
          {collections.map((collection, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100" onClick={() => handleCollectionClick(collection)}>
                {photos.filter(photo => photo.collections.includes(collection.id)).length > 0 && (
                  <img
                    src={`${baseFileUrl}${photos.find(photo => photo.collections.includes(collection.id)).large_image}`}
                    className="card-img-top"
                    alt={collection.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{collection.name}</h5>
                  <p className="card-text">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay */}
      {showOverlay && selectedCollection && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCollection.name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseOverlay}></button>
              </div>
              <div className="text-center modal-body">
                <button type="button" className="btn btn-secondary me-2" onClick={handlePrevPhoto}>
                  &larr;
                </button>
                <img
                  src={`${baseFileUrl}${photos.filter(photo => photo.collections.includes(selectedCollection.id))[currentPhotoIndex].large_image}`}
                  className="h-12 rounded img-fluid"
                  alt={selectedCollection.name}
                />
                <button type="button" className="btn btn-secondary ms-2" onClick={handleNextPhoto}>
                  &rarr;
                </button>
                <p className="mt-3">{photos.filter(photo => photo.collections.includes(selectedCollection.id))[currentPhotoIndex].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;