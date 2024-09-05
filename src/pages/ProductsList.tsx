import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableComponent from "../component/TableComponent";
import Products from "../hook/useProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type ProductsListProps = {};

const ProductsList: React.FC<ProductsListProps> = () => {
  const [list, setList] = useState<any[]>([]);

  const handleLoad = async () => {
    const resp = await Products.getProducts();
    setList(resp.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

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
            <Button size="small" variant="text" color="primary">
              <EditIcon />
            </Button>
            <Button size="small" variant="text" color="error">
              <DeleteIcon />
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];
  return (
    <Container>
      <Typography variant="h4">Products list</Typography>
      <TableComponent columns={columns} list={list} />
    </Container>
  );
};

export default ProductsList;
