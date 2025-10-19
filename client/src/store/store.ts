import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";
import budgetReducer from "./budgetSlice";
import accountReducer from "./accountSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    budget: budgetReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
