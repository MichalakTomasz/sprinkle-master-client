export const repeatTask = (callback, tick, cancellation) => {
    return new Promise((resolve, reject) => {
        const runner = async () => {
            if (cancellation?.isCancelled) {
                resolve()
                return
            }
        
            try {
                await callback()
                setTimeout(runner, tick)
            } catch (e) {
                reject(e)
            }
        }
        runner()
    })
}