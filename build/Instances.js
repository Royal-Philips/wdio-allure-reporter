'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utilsValidateData = require('./utils/validateData');

var _utilsValidateData2 = _interopRequireDefault(_utilsValidateData);

var _Instance = require('./Instance');

var _Instance2 = _interopRequireDefault(_Instance);

/**
 * Keeping track of parallelized instances
 */

var Instances = (function () {
    function Instances(options) {
        _classCallCheck(this, Instances);

        this.options = options;
        this.allure = this.options.allure;
        this.runtime = this.options.runtime;
        this.instances = {};

        this._mirrorInstanceInterface();
    }

    _createClass(Instances, [{
        key: 'createInstance',
        value: function createInstance(data) {

            (0, _utilsValidateData2['default'])(data);
            var instance = new _Instance2['default'](data, this.options);
            this.instances[data.specs[0]] = instance;
            return instance;
        }
    }, {
        key: 'getInstance',
        value: function getInstance(data) {

            (0, _utilsValidateData2['default'])(data);
            return this.instances[data.specs[0]] || this.createInstance(data);
        }
    }, {
        key: 'endAll',
        value: function endAll() {
            var _this = this;

            _Object$keys(this.instances).forEach(function (identifier) {
                _this.instances[identifier].endInstance();
            });
        }
    }, {
        key: '_mirrorInstanceInterface',
        value: function _mirrorInstanceInterface() {
            var _this2 = this;

            var properties = _Object$getOwnPropertyNames(_Instance2['default'].prototype).filter(function (propertyName) {

                // no pseudo-private functions
                if (propertyName.indexOf('_') === 0) {
                    return false;
                }

                // no existing properties (like the constructor)
                return !_this2.hasOwnProperty(propertyName);
            }).forEach(function (propertyName) {
                _this2._hookInstanceProperty(propertyName);
            });
        }
    }, {
        key: '_hookInstanceProperty',
        value: function _hookInstanceProperty(propertyName) {
            var _this3 = this;

            this[propertyName] = function (data) {
                return _this3.getInstance(data)[propertyName](data);
            };
        }
    }]);

    return Instances;
})();

exports['default'] = Instances;
module.exports = exports['default'];
