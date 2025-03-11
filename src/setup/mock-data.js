import Period from '../models/Period.js'
import PinState from '../models/PinState.js'

export const pumpPinNo = 6

export const tasks = [
    {
        id: 1,
        name: 'sekcja tył',
        start: '06:00',
        stop: '07:00',
        period: Period.EVERYDAY,
        isActive: true
    },
    {
        id: 2,
        name: 'sekcja przód',
        start: '07:00',
        stop: '08:00',
        period: Period.EVERYDAY,
        isActive: true
    }
]

export const devices = [
    {
        name: 'zawór-1',
        pinNo: 5,
        state: PinState.LOW
    },
    {
        name: 'zawór-2',
        pinNo: 20,
        state: PinState.LOW
    },
    {
        name: 'zawór-3',
        pinNo: 21,
        state: PinState.LOW
    },
    {
        name: 'zawór-4',
        pinNo: 22,
        state: PinState.LOW
    }
]


