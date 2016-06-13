'use strict'
import validate from './instance'

class Case extends Instance {

  constructur () {
    this.result = {
      start: (new Date()).getTime(),
      stop: null,
      status: null
    }
  }

  hasResult () {
    return this.result.status != null
  }

}

export default Case
