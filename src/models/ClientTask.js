export default class ClientTask {
    constructor(id, name, start, stop, period, pinNo,state, isActive){
      this.id = id
      this.name = name
      this.start = start
      this.stop = stop
      this.period = period
      this.pinNo = pinNo
      this.state = state
      this.isActive = isActive
    }
  };