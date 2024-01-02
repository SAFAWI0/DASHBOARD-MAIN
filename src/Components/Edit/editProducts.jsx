import "./editProducts.css";
import { FiEdit } from "react-icons/fi";

import { Modal, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export const EditProducts = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
    setDescription("");
    setTitle("");
    setPrice("");
  };
  const updateProduct = () => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error Not Update Product:", error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <FiEdit className="editBtn" onClick={handleOpen} />
      <Modal
        title="Add New Product"
        onOk={updateProduct}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <p>
          <b> Product Name:</b>
          <Input
            placeholder="Ex: iPhone 15"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            confirmLoading={isLoading}
          />
        </p>
        <p>
          <b> Description:</b>
          <TextArea
            rows={3}
            placeholder="Ex: An Apple mobile phone with..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </p>
        <p>
          <b>Price:</b>
          <Input
            placeholder="Ex: 2,200 $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </p>
      </Modal>
    </div>
  );
};
