import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../../../types/orderTypes";
import { privateGet, privatePost } from "../../../services/apiCaller";

export const createOrder = createAsyncThunk(
  "order/create",
  async (
    {
      token,
      items,
      deliveryAddress,
      paymentMethod
    }: {
      token: string;
      items: Array<{ food: string; quantity: number }>;
      deliveryAddress: string;
      paymentMethod: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const orderData = {
        items,
        deliveryAddress,
        paymentMethod
      };
      const response = await privatePost("/orders", token, orderData);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
};



export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await privateGet
        ("/orders", token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.unshift(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload; // expecting array of orders
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
