import path from 'path'
import validate from './utils/validate'

/**
 * Stack of one instance unit
 */

class Instance {

    constructor (data, options) {
        validate(data)
        this.instanceIdentifier = data.specs[0]
        this.options = options
        this.allure = this.options.allure
        this.runtime = this.options.runtime
        this.context = data.file

        this.current = null

        this.outputDir = this.allure.options.targetDir
    }

    startSuite (suite) {
        // root suite
        this.current = new Suite(suite)
        return this._notImplemented()
    }

    endSuite (suite) {
        return this._notImplemented()
    }

    startTest (test) {
        return this._notImplemented()
    }

    endTest (test) {
        return this._notImplemented()
    }

    passTest (test) {
        return this._notImplemented()
    }

    failTest (test) {
        return this._notImplemented()
    }

    startHook (hook) {
        return this._notImplemented()
    }

    endHook (hook) {
        return this._notImplemented()
    }

    screenshot (screenshot) {
        return this._notImplemented()   
    }

    _notImplemented () {
        throw new Error('Function not implemented in ' + this.constructor.name)
    }

    _getFunctionName (fn) {
        let ret = fun.toString()
        ret = ret.substr('function '.length)
        ret = ret.substr(0, ret.indexOf('('))
        return ret
    }

    _getTime () {
        var d = new Date()
        return d.getTime()
    }

    _getScreenshotFilename (screenshot) {
        if (screenshot.filename) {
            return path.basename(screenshot.filename)
        } else {
            return screenshot.specHash + '-' + screenshot.cid + '.png'
        }
    }

}

export default Instance
