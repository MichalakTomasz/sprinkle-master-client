import PinState from "../models/PinState"

const convertPinState = state => {
    switch (state) {
        case PinState.HIGH:
            return true
        case PinState.LOW:
            return false
        case true:
            return PinState.HIGH
        case false:
            return PinState.LOW
        case PinState.UNDEFINED:
            return undefined
        default : return PinState.LOW;
    }
}

export default convertPinState