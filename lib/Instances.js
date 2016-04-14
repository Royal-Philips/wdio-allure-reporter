import validateData from './utils/validateData'
import Instance from './Instance'

/**
 * Keeping track of parallelized instances
 */

class Instances {
    
    constructor (options) {

        this.options = options
        this.allure = this.options.allure
        this.runtime = this.options.runtime
        this.instances = {}

        this._mirrorInstanceInterface();

    }

    createInstance (data) {

        validateData(data)
        var instance = new Instance(data, this.options)
        this.instances[data.specs[0]] = instance
        return instance;

    }

    getInstance (data) {

        validateData(data)
        return this.instances[data.specs[0]] || this.createInstance(data)

    }

    _mirrorInstanceInterface () {

        var properties = Object.getOwnPropertyNames(Instance.prototype)
            .filter((propertyName) => {

                // no pseudo-private functions
                if(propertyName.indexOf('_') === 0) {
                    return false
                }

                // no existing properties (like the constructor)
                return !this.hasOwnProperty(propertyName)


            })
            .forEach((propertyName) => {
                this._hookInstanceProperty(propertyName)
            })

    }

    _hookInstanceProperty(propertyName) {
        this[propertyName] = (data) => {
            return this.getInstance(data)[propertyName](data);
        }
    }

}

export default Instances