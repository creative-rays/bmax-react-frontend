import axios from "axios";

const API_URL = "https://swapit.codemelodies.com/wp-json/bmaxapi/v1/connect";

const myHeaders = new Headers();
myHeaders.append("X-Api-Key", "app");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Api-Sec", "app");

const fetchData = async (action, additionalData = {}) => {
  try {
    const response = await axios.post(`${API_URL}/create_order`, {
      action,
      ...additionalData,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example API functions
export const createOrder = async (orderData) => fetchData("create_order", orderData);

const fetchAdminOrders = async (action, additionalData = {}) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      action,
      ...additionalData,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin orders data:", error);
    throw error;
  }
};
const fetchCustomerOrders = async (action, additionalData = {}, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "app",
      "X-Api-Sec": "app",
      "X-User-Id": id,
    },
  };

  //pass config
  try {
    const response = await axios.post(`${API_URL}`, {
      action,
      ...additionalData,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching customer order data:", error);
    throw error;
  }
};
const fetchVendorOrders = async (action, additionalData = {}, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",

      "X-User-Id": id,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        action,
        ...additionalData,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching customer order data:", error);
    throw error;
  }
};

// Example API functions
// export const getAdminOrders = async (orderData) => fetchAdminOrders("orders", orderData);

export const getOrders = async (orderData) => {
  const role = localStorage.getItem("role");
  if (role === "customer") {
    const { id } = JSON.parse(localStorage.getItem("user"));
    return await fetchCustomerOrders("orders", orderData, id);
  }
  if (role === "admin") {
    // const { id } = JSON.parse(localStorage.getItem("user"));
    return await fetchAdminOrders("orders", orderData);
  }
  if (role === "vendor") {
    const { id } = JSON.parse(localStorage.getItem("user"));
    return await fetchVendorOrders("orders", orderData);
  }
};

const fetchOrderById = async (action, additionalData = {}) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      action,
      ...additionalData,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example API functions
export const getOrderById = async (orderData) => fetchOrderById("order_detail", orderData);

export const getDashboardStatistic = async (orderData) => {
  const statistic = {};

  const data = await getOrders(orderData);

  if (data.status) {
    statistic.status = true;
    statistic.totalOrders = data.data.length;
  } else {
    statistic.status = false;
  }

  return statistic;
};
