/* globals beforeEach, it, describe */
'use strict';

var path = require('path'),
    zxpSignCmd = require('zxp-sign-cmd'),
    expect = require('chai').expect,
    cmd = require('node-cmd'),
    exec = require('child_process').exec,
    testCountry = 'AU',
    testState = 'Victoria',
    testGroup = 'Corp',
    testPassword = 'testPs',
    testCertName = 'testCert',
    testCertLoc = path.join(__dirname, '..', 'bin', testCertName + '.p12'),
    testZxpName = 'test',
    testZxpLoc = path.join(__dirname, '..', 'bin', testZxpName + '.zxp');

describe('certgen tests', function () {
    this.timeout(15000);

    var options = [];
    var testCommand = '';

    beforeEach(function () {
        testCommand = 'zxpbuild cert ';
        options  = [
            '--country',
            testCountry,
            '--state',
            testState,
            '--group',
            testGroup,
            '--name',
            '\"Certificate Name\"',
            '--output',
            testCertLoc,
            '--password',
            testPassword
        ];
    });

    it('Should generate a self-signed cert', function (done) {
        testCommand += options.join(' ');
        cmd.get(
            testCommand,
            function(err, data, stderr){
                expect(data).to.match(/Self-signed certificate generated successfully/);
                done();
            }
        );
    });

});
