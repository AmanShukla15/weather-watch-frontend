import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert, getAllAlerts, deleteAlert } from '../api/alertApi';

// Thunks for async actions
export const fetchAlerts = createAsyncThunk('alerts/fetchAll', async () => {
  const response = await getAllAlerts();
  return response;
});

export const addAlert = createAsyncThunk('alerts/add', async (alertData) => {
  const response = await createAlert(alertData);
  return response.newAlert;
});

export const removeAlert = createAsyncThunk('alerts/remove', async (id) => {
  await deleteAlert(id);
  return id;
});

const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAlert.fulfilled, (state, action) => {
        state.alerts.push(action.payload);
      })
      .addCase(removeAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter(alert => alert._id !== action.payload);
      });
  }
});

export default alertSlice.reducer;
