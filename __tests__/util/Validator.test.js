/* eslint-disable no-undef */
const { Validator } = require('../../src/util/Validator');

describe('Test validator', () => {
  const correctBody = {
    test: 'testing',
    truthy: true,
  };

  const wrongBodyIncomplete = {
    test: 'no truthy',
  };

  const wrongBodyIncorrectRules = {
    test: 'truthy?',
    truthy: false,
  };

  const bodyStructure = {
    test: 'string',
    truthy: 'boolean',
  };

  const bodyRules = {
    truthy: (req) => req.truthy === true,
  };

  const validator = new Validator(bodyStructure, bodyRules);

  test('body dengan struktur dan rule benar hasil true', () => {
    expect(validator.validate(correctBody)).toBe(true);
  });

  test('body tidak komplit hasil false', () => {
    expect(validator.validate(wrongBodyIncomplete)).toBe(false);
  });

  test('body rule salah hasil false', () => {
    expect(validator.validate(wrongBodyIncorrectRules)).toBe(false);
  });
});
