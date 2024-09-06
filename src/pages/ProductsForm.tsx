import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import Products from "../hook/useProducts";

type ProductsFormProps = {};

const schema = yup.object().shape({
  name: yup.string().required("Field is required"),
  category_sub_level_1: yup.string().required("Field is required"),
  amount: yup
    .number()
    .required("Field is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .moreThan(0, "Price must be greater than 0"),
  price: yup
    .number()
    .required("Field is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .moreThan(0, "Price must be greater than 0"),
  cost_price: yup
    .number()
    .required("Field is required")
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .moreThan(0, "Price must be greater than 0"),
  desc: yup.string(),
});

const ProductsForm: React.FC<ProductsFormProps> = () => {
  const [category1, setCategory1] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleFormData = async (id: number) => {
    const res = await Products.getProduct(id);

    if (res.data) {
      setValue("name", res?.data?.name);
      setValue("category_sub_level_1", res?.data?.category_sub_level_1);
      setValue("amount", res?.data?.amount);
      setValue("price", res?.data?.price);
      setValue("cost_price", res?.data?.cost_price);
      setValue("desc", res?.data?.desc || "");
    }
  };

  useEffect(() => {
    if (id) {
      handleFormData(parseInt(id));
    }
  }, [id]);

  const handleLoad = async () => {
    const resp = await Products.getCategory1();
    setCategory1(resp.data);
    setReload(false);
  };

  useEffect(() => {
    handleLoad();
  }, [reload]);

  const onSave = async (data: any) => {
    console.log(data);
    if (id) {
      await Products.updateProduct(parseInt(id), data);
    } else {
      await Products.createProducts(data);
    }
  };
  return (
    <Container component={"main"} maxWidth="md">
      <FormProvider {...methods}>
        <Typography variant="h4">Products form</Typography>
        <Stack display={"flex"} alignItems={"start"}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </Button>
        </Stack>
        <form onSubmit={handleSubmit(onSave)} method="post">
          <Paper
            elevation={3}
            sx={{
              margin: "1rem 0 0 0",
              padding: "1rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Product name"
                        disabled={id ? true : false}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : null}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="category_sub_level_1"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">
                          Category 1
                        </InputLabel>
                        <Select
                          {...field}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          fullWidth
                          size="small"
                          label="Category 1"
                          error={!!errors.category_sub_level_1}
                          value={field.value || ""}
                        >
                          {category1?.map((item: any, i: number) => (
                            <MenuItem key={i + 1} value={item?.name}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText sx={{color:'#c62828'}}>
                          {errors.category_sub_level_1
                            ? errors.category_sub_level_1.message
                            : null}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="amount"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        size="small"
                        label="Amount"
                        onKeyDown={(e) => {
                          if (["+", "-", "*", "/"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                        error={!!errors.amount}
                        helperText={
                          errors.amount ? errors.amount.message : null
                        }
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        size="small"
                        label="Price"
                        onKeyDown={(e) => {
                          if (["+", "-", "*", "/"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : null}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="cost_price"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        size="small"
                        label="Cost price"
                        onKeyDown={(e) => {
                          if (["+", "-", "*", "/"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                        error={!!errors.cost_price}
                        helperText={
                          errors.cost_price ? errors.cost_price.message : null
                        }
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Stack
                  direction={"column"}
                  justifyContent={"start"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="desc"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Description"
                        multiline
                        rows={5}
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                  <Box>
                    {!id ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        type="submit"
                        size="small"
                      >
                        Create
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                      >
                        Save
                      </Button>
                    )}
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      type="reset"
                      size="small"
                    >
                      Reset
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ProductsForm;
