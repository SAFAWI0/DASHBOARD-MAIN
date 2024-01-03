import { useEffect, useState } from "react";
import Container from "../Container/container";
import "./productsTable.css";
import { DeleteProducts } from "../Delete/deleteProducts";
import { EditProducts } from "../Edit/editProducts";
import { AddProducts } from "../AddProducts/addProducts";
import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ShowProducts } from "../ShowProducts/showProducts";
export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const getProducts = () => {
    fetch(
      `https://dummyjson.com/products/search?q=${search}&limit=15&skip=${skip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, [search, skip]);

  const handleInputChange = () => {
    setSearch(value);
    setSkip(0);
  };

  return (
    <div>
      <Container>
        <div className="search-box">
          <button onClick={handleInputChange}>
            <SearchOutlined style={{ paddingLeft: "10px", fontSize: "20px" }} />
          </button>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write what you like to search for"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(value);
              }
            }}
          />
        </div>
        <AddProducts />
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th className="desc">Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((el, i) => (
                <tr key={i}>
                  <td>{el.id}</td>
                  <td>{el.title}</td>
                  <td className="desc">{el.description}</td>
                  <td>
                    <b>{Number(el.price).toLocaleString("en")} $</b>
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <EditProducts id={el.id} />
                      <DeleteProducts id={el.id} />
                      <ShowProducts
                        id={el.id}
                        title={el.title}
                        description={el.description}
                        thumbnail={el.thumbnail}
                        price={el.price}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
        className="pagination"
         
          defaultCurrent={1}
          total={100}
          showSizeChanger={false}
          onChange={(page) => setSkip((page - 1) * 10)}
        />
      </Container>
    </div>
  );
};
