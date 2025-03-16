import { createContainer, asClass, asValue } from 'awilix'
import MainController from '../controllers/MainController.js'
import DataManager from '../services/DataManager.js'

const container = createContainer()

container.register({
  config: asValue({ baseUrl: 'http://watter-pump:3200/' }),
  mainController: asClass(MainController).singleton(),
  dataManager: asClass(DataManager).singleton()
})
  
  export default container