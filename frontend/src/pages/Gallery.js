import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;
const baseFileUrl = process.env.REACT_APP_IMAGE_URL;

const Gallery = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedCollection(null);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % selectedCollection.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + selectedCollection.photos.length) % selectedCollection.photos.length);
  };

  return (
    <div className="container-fluid my-4">
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
              <div className="card h-400px" onClick={() => handleCollectionClick(collection)}>
                {collection.photos.length > 0 && (
                  <img
                    src={`${baseFileUrl}${collection.photos[0].large_image}`}
                    className="card-img-top"
                    alt={collection.name}
                    style={{ objectFit: 'fit', height: '300px' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{collection.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photos Overlay */}
      {selectedCollection && showOverlay && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="modal-dialog modal-dialog-centered modal-fullscreen" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCollection.name}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseOverlay}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={`${baseFileUrl}${selectedCollection.photos[currentPhotoIndex].large_image}`}
                  alt={selectedCollection.photos[currentPhotoIndex].title}
                  className="img-fluid rounded"
                  style={{ height: '80vh', objectFit: 'cover' }}
                />
                <div className="carousel-caption bg-dark bg-opacity-50 rounded p-2 mt-2">
                  <h5>{selectedCollection.photos[currentPhotoIndex].title}</h5>
                  <p>{selectedCollection.photos[currentPhotoIndex].description}</p>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handlePrevPhoto}>
                  Previous
                </button>
                <button type="button" className="btn btn-primary" onClick={handleNextPhoto}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;