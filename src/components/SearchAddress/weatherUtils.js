// weatherUtils.js

export const fetchWeatherData = (lat, lng, date, time) => {
    const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
    const endpoint = '/wp-json/bmaxapi/v1/connect'; // Ensure this matches the endpoint path in your API
    const url = `${apiUrl}${endpoint}`;

    const data = { lat, lng, date, time };

    console.log('Fetching weather data from:', url);
    console.log('Data:', data);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}`,
            'X-api-key' : 'app',
            'X-api-Sec': 'app',
            'X-User-Id': '204'

        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then((responseData) => {
        console.log('Weather API Response:', responseData); // Log the entire response for debugging

        // Check if the response structure is as expected
        if (responseData && responseData.status === true && responseData.message === "Weather data found" && responseData.data && responseData.data.data && responseData.data.data.current) {
            const currentWeather = responseData.data.data.current;

            // Define the structure of weatherData
            const weatherData = {
                lat,
                lng,
                date,
                time,
                temperature_high: currentWeather.temperature_high,
                temperature_low: currentWeather.temperature_low,
                precipitation_amount: currentWeather.precipitation_amount,
                wind_speed: currentWeather.wind_speed,
                feels_like: currentWeather.feels_like,
                icon: currentWeather.icon,
            };

            console.log('Formatted Weather Data:', weatherData); // Log formatted weather data

            return weatherData;
        } else {
            console.error('Unexpected response format or data not found:', responseData);
            throw new Error('Unexpected response format or data not found');
        }
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error);
        return null; // Return null or handle error as per your application's needs
    });
};


export const fetchVehicleTypes = async () => {
    const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
    const endpoint = '/wp-json/bmaxapi/v1/connect'; // Endpoint path from environment variable
    const url = `${apiUrl}${endpoint}`;

    const requestData = {
        // Include any necessary data in your request body
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}`,
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch vehicle types: ${response.status} ${response.statusText}`);
        }

        const vehicleTypes = await response.json();
        console.log('Vehicle Types:', vehicleTypes); // Log the vehicle types data

        return vehicleTypes;
    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        throw error; // Re-throw the error to handle it in your React component
    }
};
