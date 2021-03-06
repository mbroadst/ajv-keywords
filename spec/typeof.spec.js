'use strict';

var Ajv = require('ajv');
var definition = require('../keywords/typeof');
var defineKeywords = require('..');
var should = require('chai').should();


describe('keyword "typeof"', function() {
  var ajvs = [ new Ajv, new Ajv ];
  ajvs[0].addKeyword('typeof', definition);
  defineKeywords(ajvs[1], 'typeof');

  ajvs.forEach(function (ajv, i) {
    it('should validate value types #' + i, function() {
      ajv.validate({ typeof: 'undefined' }, undefined) .should.equal(true);
      ajv.validate({ typeof: 'undefined' }, null) .should.equal(false);
      ajv.validate({ typeof: 'undefined' }, 'foo') .should.equal(false);
      ajv.validate({ typeof: 'function' }, function(){}) .should.equal(true);
      ajv.validate({ typeof: 'function' }, {}) .should.equal(false);
      ajv.validate({ typeof: 'object' }, {}) .should.equal(true);
      ajv.validate({ typeof: 'object' }, null) .should.equal(true);
      ajv.validate({ typeof: 'object' }, 'foo') .should.equal(false);
      ajv.validate({ typeof: 'symbol' }, Symbol()) .should.equal(true);
      ajv.validate({ typeof: 'symbol' }, {}) .should.equal(false);
    });
  });

  ajvs.forEach(function (ajv, i) {
    it('should throw when unknown type is passed #' + i, function() {
      should.throw(function() {
        ajv.compile({ typeof: 'unknownType' });
      });
    });
  });
});
