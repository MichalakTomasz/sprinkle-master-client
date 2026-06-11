import { getWeatherPrediction } from "../helpers/weatherPredictionHelper.js"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"

const WeatherPrediction = ({ open, onClose }) => {
    const [weatherPredictionResult, setWeatherPredictionResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!open) {
            return
        }

        let isActive = true

        const fetchWeatherPrediction = async () => {
            setIsLoading(true)

            try {
                const result = await getWeatherPrediction()

                if (isActive) {
                    setWeatherPredictionResult(result)
                }
            } finally {
                if (isActive) {
                    setIsLoading(false)
                }
            }
        }

        fetchWeatherPrediction()

        return () => {
            isActive = false
        }
    }, [open])

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Daily Weather Prediction</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <Typography>Loading weather prediction...</Typography>
                ) : (
                    <>
                        <Typography variant="h6">
                            Location: {weatherPredictionResult?.location ?? "Unknown"}
                        </Typography>
                        {weatherPredictionResult?.averageRain != null ? (
                            <Typography>
                                Average Rain: {weatherPredictionResult.averageRain} mm/m2
                            </Typography>
                        ) : (
                            <Typography>
                                {weatherPredictionResult?.message ?? "No weather prediction available."}
                            </Typography>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button 
                onClick={event => event.preventDefault() || onClose()}
                type="submit">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default WeatherPrediction