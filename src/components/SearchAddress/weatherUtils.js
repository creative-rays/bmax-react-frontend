export const fetchWeatherData = async (lat, lon) => {
  const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
  //   const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
  const apiUrl = `https://swapit.codemelodies.com/wp-json/bmaxapi/v1/connect`;

  const requestData = {
    action: "weather_general",
    lat,
    lon,
  };

  try {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const weatherData = await response.json();
    console.log("Weather API Response:", weatherData);

    return weatherData.data.properties.timeseries;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// fetchVehicleTypes.js

export const fetchVehicleTypes = async () => {
  const apiUrl = "https://swapit.codemelodies.com";
  const endpoint = "/wp-json/bmaxapi/v1/connect";
  const url = `${apiUrl}${endpoint}`;

  const requestData = {
    action: "vehicle_types",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vehicle types: ${response.status} ${response.statusText}`);
    }

    const vehicleTypes = await response.json();
    console.log("Vehicle Types:", vehicleTypes); // Log the vehicle types data

    return vehicleTypes;
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    throw error; // Re-throw the error to handle it in your React component
  }
};

// fetchTypeProject.js
const nameTranslation = {
  Garasjegulv: "Garage floor",
  Kjellergulv: "Basement floor",
  Systemelementer: "System elements",
  Veggstøp: "Wall plaster",
  Terrasseplate: "Terrace board",
  Trapper: "Stairs",
  "Annen støp ute": "Another cast outside",
  "Annen støp inne": "Other cast inside",
  Støttemur: "Retaining wall",
};

export const fetchTypeProject = async () => {
  const apiUrl = "https://swapit.codemelodies.com";
  const endpoint = "/wp-json/bmaxapi/v1/connect";
  const url = `${apiUrl}${endpoint}`;

  const requestData = {
    action: "concrete_presets",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch type project: ${response.status} ${response.statusText}`);
    }

    const typeProject = await response.json();
    console.log("Type Project:", typeProject); // Log the type project data

    // Translate the names
    typeProject.results = typeProject.results.map((item) => ({
      ...item,
      name: nameTranslation[item.name] || item.name, // Use translation if available
    }));

    return typeProject;
  } catch (error) {
    console.error("Error fetching type project:", error);
    throw error; // Re-throw the error to handle it in your React component
  }
};

export const fetchUploadAPI = async (file) => {
  const apiUrl = "https://swapit.codemelodies.com/wp-json/bmaxapi/v1/file-upload";

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("File upload result:", result);

    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error to handle it in your React component
  }
};

export const createOrder = async (orderData) => {
  const apiUrl = "https://swapit.codemelodies.com";
  const endpoint = "/wp-json/bmaxapi/v1/connect";
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "create_order",
        companyName: orderData.step3State.companyName,
        vatNumber: orderData.step3State.vatNumber,
        ...orderData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      console.log("Order creation response:", result);
      return result;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
