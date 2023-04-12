import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { useDeleteProduct, useShopProducts } from './../../hooks/useProducts';
import { toast } from 'react-toastify';
import ButtonLoader from '../Loaders/ButtonLoader';
import Dialog from '../common/Dialog';

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);

  const [pageSize, setPageSize] = useState(8);
  const [clickedRow, setClickedRow] = useState();
  const [toggleDialog, setToggleDialog] = useState(false);
  const [productId, setProductId] = useState('');

  const { data, isLoading, refetch } = useShopProducts(
    `products/shop/${seller._id}`
  );
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    error: errorDelete,
    mutate,
  } = useDeleteProduct();

  const deleteProduct = (id) => {
    mutate(`products/${id}/shop/${seller._id}`);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = (id) => {
    setToggleDialog(!toggleDialog);
    setProductId(id);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccessDelete) {
      toast(dataDelete?.message);
      refetch();
    }
    if (isErrorDelete) {
      toast(errorDelete.response?.data?.message);
    }
  }, [dataDelete, isSuccessDelete, refetch, isErrorDelete, errorDelete]);

  const columns = [
    { field: 'id', headerName: 'Id', minWidth: 70, flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'discountPrice',
      headerName: 'Price',
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: 'numberInStock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 50,
      flex: 0.4,
    },

    {
      field: 'soldOut',
      headerName: 'Sold out',
      type: 'number',
      minWidth: 50,
      flex: 0.4,
    },
    {
      field: 'Preview',
      flex: 0.4,
      minWidth: 50,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const url = params.row.url;

        return (
          <>
            <Link to={`/product/${url}`} target='_blank'>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: 'Edit',
      flex: 0.3,
      minWidth: 50,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const url = params.row.url;

        return (
          <>
            <Link to={`/dashboard/products/${url}/edit`}>
              <Button>
                <MdOutlineEdit size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: 'Delete',
      flex: 0.4,
      minWidth: 60,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Button onClick={() => handleDelete(id)} disabled={isLoadingDelete}>
              {clickedRow?.id === id ? (
                <>
                  {isLoadingDelete ? (
                    <ButtonLoader color={'black'} width={20} />
                  ) : (
                    <AiOutlineDelete size={20} />
                  )}
                </>
              ) : (
                <AiOutlineDelete size={20} />
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data?.products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discountPrice: 'US$ ' + item.discountPrice,
        numberInStock: item.numberInStock,
        soldOut: item.soldOut,
        url: item.url,
      });
    });

  return (
    <div className='w-full h-[90vh] overflow-y-scroll'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full mx-8 pt-1 mt-10 bg-white'>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 8, 10, 20, 30]}
            disableSelectionOnClick
            autoHeight
            onRowClick={({ row }) => setClickedRow(row)}
          />
        </div>
      )}
      <Dialog toggle={toggleDialog}>
        <div className='bg-blue-500 px-2'>
          <span className='text-[16px] sm:text-[18px] text-white font-bold'>
            Delete Product
          </span>
        </div>

        <div className='my-8 w-full flex justify-center gap-[30px]'>
          <button
            className='bg-main-bg border-none px-4 py-1 rounded-md font-bold'
            onClick={() => setToggleDialog(!toggleDialog)}
          >
            Cancel
          </button>
          <button
            className='bg-main-bg border-none px-4 py-1 rounded-md font-bold'
            onClick={() => deleteProduct(productId)}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default AllProducts;
