/* globals beforeEach, it, describe */
'use strict';

var path = require('path'),
    zxpSignCmd = require('zxp-sign-cmd'),
    expect = require('chai').expect,
    cmd = require('node-cmd'),
    exec = require('child_process').exec,
    testPassword = 'testPs',
    testCertName = 'testCert',
    testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12'),
    testZxpName = 'test',
    testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

var matchCheck = function(stdout, match){
    expect(stdout).to.match(match);
    done();
};

describe('zxpbuild tests', function () {
    this.timeout(15000);

    var options = [];
    var testCommand = '';

    beforeEach(function () {
        testCommand = 'zxpbuild ';
        options  = [
            '--input',
            path.join(__dirname, 'ext'),
            '--output',
            testZxpLoc,
            '--cert',
            testCertLoc,
            '--pass',
            testPassword
        ];
    });

    it('Should throw an error because input is not provided', function (done) {
        options.splice(0, 2);
        testCommand += options.join(' ');
        cmd.get(
            testCommand,
            function(err, data, stderr){
                expect(data).to.match(/input property is required/);
                done();
            }
        );
    });

    it('Should throw an error because output is not provided', function (done) {
        options.splice(2, 2);
        testCommand += options.join(' ');

        cmd.get(
            testCommand,
            function(err, data, stderr){
                expect(data).to.match(/output property is required/);
                done();
            }
        );
    });

    it('Should throw an error because cert is not provided', function (done) {
        options.splice(4, 2);
        testCommand += options.join(' ');

        cmd.get(
            testCommand,
            function(err, data, stderr){
                expect(data).to.match(/cert property is required/);
                done();
            }
        );
    });

    it('Should throw an error because password is not provided', function (done) {
        options.splice(6, 2);
        testCommand += options.join(' ');

        cmd.get(
            testCommand,
            function(err, data, stderr){
                expect(data).to.match(/password property is required/);
                done();
            }
        );
    });

});
