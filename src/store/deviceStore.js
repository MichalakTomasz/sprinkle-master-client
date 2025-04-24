import { create } from 'zustand'

const useDeviceStore = create((set) => ({
    valves: [],
    pump: null,
    tasks: [],
    deviceStates: {},
    isSchedulerEnabled: false,
    themeId: localStorage.getItem('themeId') ?? 1,
    useWeatherAssistant: false,
          
    setValves: (valves) => set({ valves }),
    setPump: (pump) => set({ pump }),
    setTasks: (tasks) => set({ tasks }),
    
    updateValve: (valve) => set((state) => ({
        valves: state.valves.map(v => v.id === valve.id ? valve : v)
    })),
    
    updateTask: (task) => set((state) => ({
        tasks: state.tasks.map(t => t.id === task.id ? task : t)
    })),
    
    setDeviceState: (deviceId, state) => set((store) => ({
        deviceStates: {
            ...store.deviceStates,
            [deviceId]: state
        }
    })),
    setIsSchedulerEnabled: (isEnabled) => set({isSchedulerEnabled: isEnabled}),
    setThemeId: themeId => set({themeId : themeId}),
    setUseWeatherAssistant: (useWeatherAssistant) => set({useWeatherAssistant: useWeatherAssistant})
}))

export default useDeviceStore
