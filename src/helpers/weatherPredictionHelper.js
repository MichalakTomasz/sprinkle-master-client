import container from '../container/container.js'

const formatLocation = location => {
    if (!location) {
        return null
    }

    if (typeof location === 'string') {
        return location
    }

    if (typeof location === 'object') {
        const parts = [location.city, location.regionName, location.country].filter(Boolean)

        if (parts.length > 0) {
            return parts.join(', ')
        }
    }

    return String(location)
}

export const getWeatherPrediction = async () => {
        try {   
            const mainController = container.resolve('mainController');
            const response = await mainController.getWeatherPredictionOnline();
            if (!response) {
                return { message: 'Failed to fetch weather prediction' };
            }
            const rain = response.weatherPrediction?.hourly?.rain;
            if (!rain) {
                return { message: 'No rain prediction available' };
            }

            const averageRain = Math.round(rain.reduce((acc, r) => acc + r, 0) / rain.length, 0);
            return { 
                averageRain,
                location: formatLocation(response.location)
            };

        } catch (error) {
            console.error('Error fetching weather prediction:', error);
            return {message: 'Error fetching weather prediction'};
        }   
    }