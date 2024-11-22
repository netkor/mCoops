//ui for PoweredBy component
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function PoweredBy() {
  return (
    <div className="text-center py-1 bg-danger text-white">
      <p>
        Made with <FontAwesomeIcon icon={faHeart} className="text-white" /> by{" "}
        <a
          href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="text-light"
        >
          Ara Tech Solution{" "}
        </a>
      </p>
    </div>
  );
}

export default PoweredBy;
