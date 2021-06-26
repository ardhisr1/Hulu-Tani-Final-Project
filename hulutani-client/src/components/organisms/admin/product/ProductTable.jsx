import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import adminShowProductAction from "../../../../redux/admin/product/show/adminShowProductAction";
import adminDeleteProductAction from "../../../../redux/admin/product/delete/adminDeleteProductAction";

const ths = [
    { name: "No" },
    { name: "Nama Produk" },
    { name: "Kategori Id" },
    { name: "Jumlah (PCS)" },
    { name: "Harga (IDR)" },
    { name: "Aksi", join: "2" },
  ],
  ProductTable = () => {
    const adminProductsData = useSelector(
      (state) => state.adminShowProducts.products
    );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(adminShowProductAction.getProducts());
    }, []);

    const handleDelete = (id) => {
      Swal.fire({
        title: "Hapus produk?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya, hapus ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(adminDeleteProductAction.deleteProduct(id));
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Berhasil hapus produk",
          });
        }
      });
    };

    return (
      <table className="table table-bordered border-3 border table-hover admin-table">
        <thead className="table-light">
          <tr>
            {ths.map((th) => (
              <th scope="col" colSpan={th.join} className="text-center">
                {th.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adminProductsData.map((data, index) => {
            return (
              <tr key={index}>
                <td className="text-center">1</td>
                <td>{data.nama}</td>
                <td>{data.id_kategori}</td>
                <td>{data.stok}</td>
                <td>{data.harga}</td>
                <td className="text-center">
                  <Link to={`/admin/dash/product/edit/${data.id}`}>
                    <button type="button" className="btn btn-primary">
                      Ubah
                    </button>
                  </Link>
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(data.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

export default ProductTable;