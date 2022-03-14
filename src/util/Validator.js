/* eslint-disable valid-typeof */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
class Validator {
  constructor(types, rules = {}) {
    this._types = types;
    this._rules = rules;
  }

  validateTypes(requestBody) {
    const types = Object.keys(this._types);
    for (let i = 0; i < types.length; i++) {
      // eslint-disable-next-line valid-typeof
      const type = types[i];
      if (!requestBody.hasOwnProperty(type) || typeof requestBody[type] !== this._types[type]) {
        return false;
      }
    }

    return true;
  }

  validateRules(requestBody) {
    const ruleName = Object.keys(this._rules);
    for (let i = 0; i < ruleName.length; i++) {
      const name = ruleName[i];
      // eslint-disable-next-line no-cond-assign
      if (!requestBody.hasOwnProperty(name)) {
        return false;
      }

      // eslint-disable-next-line valid-typeof
      const msg = this._rules[name](requestBody);
      if (!msg === true) {
        return msg;
      }
    }

    return true;
  }

  validate(requestBody) {
    const typeValidationResult = this.validateTypes(requestBody);
    if (!typeValidationResult) {
      return typeValidationResult;
    }

    const ruleValidationResult = this.validateRules(requestBody);
    if (ruleValidationResult !== true) {
      return ruleValidationResult;
    }

    return true;
  }
}

module.exports = { Validator };
