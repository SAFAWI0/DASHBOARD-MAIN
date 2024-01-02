import Swal from "sweetalert2";
import "./deleteProducts.css"
import { RiDeleteBin6Line } from "react-icons/ri";


export const DeleteProducts = ({id}) => {

    const handeldelet = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://dummyjson.com/products/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then(console.log);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              
            });
          }
        });
      };
  return (
    <div><RiDeleteBin6Line className="deleteBtn" onClick={() => handeldelet(id)}/></div>
  )
}
