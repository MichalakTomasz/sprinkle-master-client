import { createContainer, asClass, asValue } from 'awilix'
import MainController from '../controllers/MainController.js'
import DataManager from '../services/DataManager.js'

const container = createContainer()

const ipAddress = localStorage.getItem('ipAddress')

container.register({
  config: asValue({ baseUrl: ipAddress ? `http://${ipAddress}/` : 'http://sprinkle-master:3200/' }),
  mainController: asClass(MainController).singleton(),
  dataManager: asClass(DataManager).singleton()
})
  
  export default container