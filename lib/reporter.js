import events from 'events'
import Allure from 'allure-js-commons'
import Runtime from 'allure-js-commons/runtime'
import Instances from './instances'

/**
 * Initialize a new `Allure` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */
class AllureReporter extends events.EventEmitter {
    constructor (baseReporter, config, options = {}) {
        super()

        this.baseReporter = baseReporter
        this.config = config
        this.options = options.allure || {}
        this.outputDir = this.options.outputDir || 'allure-results'

        this.allure = new Allure()
        this.runtime = new Runtime(this.allure)

        this.allure.setOptions({
            targetDir: this.outputDir
        })

        this.instances = new Instances({
            allure: this.allure,
            runtime: this.runtime,
            verbose: this.options.verbose
        })

        const { epilogue } = this.baseReporter

        // this suite catches errors in hooks of the root suite
        this.allure.startSuite(this.getProjectName())

        this.on('end', () => {
            Object.keys(this.instances.instances).forEach((identifier) => {
                this.instances.instances[identifier].endInstance()
            })
            this.allure.endSuite(this.getProjectName())
            epilogue.call(baseReporter)
        })

        let eventNames = [
            'suite:start',
            'test:start',
            'test:end',
            'test:pass',
            'test:fail',
            'hook:start',
            'hook:end',
            'runner:screenshot'
        ]

        eventNames.forEach((eventName) => {
            let functionName
            let command = eventName.split(':')

            if(command[1] === 'screenshot') {
                functionName = 'screenshot'
            } else {
                functionName = command[1] + command[0].substr(0,1).toUpperCase() + command[0].substr(1)
            }

            console.log('calling ' + functionName + ' for ' + eventName)
            this.on(eventName, this.instances[functionName])
        })

    }

    getProjectName () {
        return this.options.projectName || 'Unknown Project'
    }

}

export default AllureReporter
