import modelData from './modelData'

class Mortgage {
  constructor (modelData) {
    this.modelData = modelData
  }

  get () {
    return this.modelData.get()
  }

  save () {
    this.modelData.save()
  }
}

export default new Mortgage(modelData)
