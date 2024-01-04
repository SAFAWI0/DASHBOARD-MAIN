import { useState } from "react";
import Container from "../Container/container";
import "./addProducts.css";
import { Modal, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const AddProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
    setDescription("");
    setTitle("");
    setPrice("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const addProduct = () => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
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
        console.error("Error Not Added Product:", error);
        setIsLoading(false);
      });
  };
  return (
    <div className="add">
      <Container>
        <div>
          <button onClick={handleOpen}>Add New Products</button>
        </div>

        <Modal
          title="Add New Product"
          open={isModalOpen}
          onOk={addProduct}
          onCancel={handleCancel}
          confirmLoadingding={isLoading}
        >
          <p>
            <b> Product Name:</b>
            <Input
              placeholder="Ex: iphone X"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="Ex: 1,200 $"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
        </Modal>
      </Container>
    </div>
  );
};
