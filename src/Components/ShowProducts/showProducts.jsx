import { useState } from "react";
import { Modal } from "antd";
import "./showProducts.css";
import { AiOutlineFileSearch } from "react-icons/ai";

export const ShowProducts = ({ id, title, description, thumbnail, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div >
      <AiOutlineFileSearch  className="butShow" onClick={handleOpen}>SHOW</AiOutlineFileSearch >
      <Modal
        title=" Product Details"
        onOk={handleCancel}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="show">
          <p>
            <b> Product Name: </b>
            {title}
          </p>
          <img src={thumbnail} alt={title} />
          <p>
            <b> Description: </b>
            {description}
          </p>
          <p>
            <b>Price: </b>
            {Number(price).toLocaleString("en")} $
          </p>
        </div>
      </Modal>
    </div>
  );
};
