import { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./core/Modal";
import usePagination from "../hooks/usePagination";
import solidIcons from "../assets/icons/solidIcons";
import imageList from "./helpers/imageArray";
import { range } from "../util/range";

solidIcons();

function App() {
  const [faSpock, setFaSpock] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const Navbar = () => {
    return (
      <div className="navbar-container">
        <NavLink to="/home" activeClassName="custom-active-class">
          Home
        </NavLink>

        <NavLink to="/gallery" activeClassName="custom-active-class">
          Gallery
        </NavLink>
      </div>
    );
  };

  const Home = ({ customHeader }) => {
    return (
      <div className="home-container">
        <div className="header">{customHeader}</div>

        <div className="hand-wrapper">
          <FontAwesomeIcon
            icon={`fa-solid fa-${faSpock ? "hand-spock" : "hand"}`}
            onClick={() => setFaSpock((prev) => !prev)}
          />

          <div
            className="spock-message"
            style={{ color: faSpock ? "black" : "transparent" }}
          >
            Live Long and Prosper
          </div>
        </div>
      </div>
    );
  };

  const Gallery = () => {
    return (
      <div className="gallery-container">
        <div
          className="gallery-btn"
          onClick={() => setIsViewOpen((prev) => !prev)}
        >
          View Gallery
        </div>

        <Modal isOpen={isViewOpen} onRequestClose={() => setIsViewOpen(false)}>
          <GalleryForm header="Wondrous Gallery" />
        </Modal>
      </div>
    );
  };

  const GalleryForm = ({ header }) => {
    const [imageData, setImageData] = useState([]);
    const paginateImages = usePagination(imageData, 1);

    const renderImageGallery = () => {
      const currentImage = paginateImages.currentData();

      return currentImage.map((image) => {
        return (
          <GalleryItem
            key={image.id}
            image={image.data}
            header={image.header}
            pageNum={paginateImages.currentPage}
          />
        );
      });
    };

    const renderPaginationButtons = () => {
      return range(1, paginateImages.maxPage).map((pageNum) => {
        return (
          <div
            key={pageNum}
            className={`page-btn ${
              pageNum === paginateImages.currentPage ? "active" : ""
            }`}
            onClick={() => paginateImages.jump(pageNum)}
          >
            {pageNum}
          </div>
        );
      });
    };

    useEffect(() => {
      setImageData(imageList);
    }, []);

    const GalleryItem = ({ image, header, pageNum }) => {
      return (
        <div className="gallery-item-container">
          <div className="header-item">{header}</div>

          <div className="page">Page: {pageNum}</div>

          <div className="image-wrapper">
            <img src={image} alt={header} />
          </div>
        </div>
      );
    };

    return (
      <div className="gallery-form-container">
        <div className="header">{header}</div>

        <div className="gallery-wrapper">{renderImageGallery()}</div>

        <div className="buttons-wrapper">
          <button
            className="pagination-btn"
            disabled={paginateImages.currentPage === 1}
          >
            <FontAwesomeIcon
              onClick={paginateImages.prev}
              icon="fa-solid fa-caret-left"
            />
          </button>

          {renderPaginationButtons()}

          <button
            className="pagination-btn"
            disabled={paginateImages.currentPage === paginateImages.maxPage}
          >
            <FontAwesomeIcon
              onClick={paginateImages.next}
              icon="fa-solid fa-caret-right"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Route path="/" component={Navbar} />
      <Switch>
        <Route
          path="/home"
          render={(routeProps) => (
            <Home {...routeProps} customHeader="I'm a header sent by Props!" />
          )}
        />

        <Route path="/gallery" component={Gallery} />
      </Switch>
    </div>
  );
}

export default App;
