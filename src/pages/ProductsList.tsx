import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../component/TableComponent";
import Products from "../hook/useProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogConfirm from "../component/DialogConfirm";
import { useNavigate } from "react-router-dom";

type ProductsListProps = {};

const ProductsList: React.FC<ProductsListProps> = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const navigate = useNavigate();
  const typesRef = useRef<any>({});

  const handleLoad = async () => {
    const resp = await Products.getProducts();
    setList(resp.data);
    setReload(false);
  };

  const handleOpenDialog = async (data: any) => {
    typesRef.current = data;
    setOpenDialog(true);
  };

  const handleDelete = async (name: string) => {
    await Products.deleteProducts(name);
    setOpenDialog(false);
    setReload(true);
  };

  useEffect(() => {
    handleLoad();
  }, [reload]);

  const columns = [
    {
      id: "no",
      name: "No",
      align: "center",
      alignItem: "center",
      render: (_r: any, i: number) => i + 1,
    },
    {
      id: "name",
      align: "center",
      name: "Product name",
      render: (r: any) => <>{r?.name}</>,
    },
    {
      id: "category_1",
      name: "Category",
      align: "center",
      alignItem: "center",
      render: (r: any) => <>{r?.category_1?.name}</>,
    },
    {
      id: "amount",
      name: "Amount",
      align: "center",
      alignItem: "center",
      render: (r: any) => <>{r?.amount}</>,
    },
    {
      id: "price",
      name: "Price",
      align: "center",
      alignItem: "center",
      render: (r: any) => <>{r?.price}</>,
    },
    {
      id: "cost_price",
      name: "Cost price",
      align: "center",
      alignItem: "center",
      render: (r: any) => <>{r?.cost_price}</>,
    },
    {
      id: "action",
      name: "Action",
      align: "center",
      alignItem: "center",
      render: (r: any) => (
        <Box>
          <Stack spacing={1} display={"flex"} direction={"row"} width={50}>
            <Button size="small" variant="text" color="primary" onClick={() => navigate(`/form/${r?.products_id}`)}>
              <EditIcon />
            </Button>
            <Button
              size="small"
              variant="text"
              color="error"
              onClick={() => handleOpenDialog(r)}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <Container component={"main"} maxWidth="md">
      <Typography variant="h4">Products list</Typography>
      <Stack display={"flex"} alignItems={"end"}>
        <Button variant="contained" onClick={() => navigate("/form")}>
          <AddCircleIcon />
        </Button>
      </Stack>
      <TableComponent columns={columns} list={list} />
      <DialogConfirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onClick={() => handleDelete(typesRef.current?.name)}
        title={"Are you sure"}
        message={`Are you sure you want to delete this ${typesRef?.current?.type_name}?`}
      />
    </Container>
  );
};

export default ProductsList;
