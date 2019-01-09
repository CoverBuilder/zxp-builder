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

describe('zxpbuild tests', function () {
    this.timeout(15000);

    var signOptions = [];
    var signCommand = '';
    var buildOptions = [];
    var buildCommand = '';

    beforeEach(function () {
        signCommand = 'zxpbuild cert ';
        signOptions  = [
            testCertLoc,
            'AU',
            'Victoria',
            'Corp',
            'Test',
            '--password',
            testPassword
        ];

        buildCommand = 'zxpbuild package ';
        buildOptions  = [
            path.join(__dirname, 'ext'),
            testZxpLoc,
            testCertLoc,
            '--password',
            testPassword
        ];
    });

    it('Should generate a self-signed cert', function (done) {
        signCommand += signOptions.join(' ');
        cmd.get(
            signCommand,
            function(err, data, stderr){
                expect(data).to.match(/Self-signed certificate generated successfully/);
                done();
            }
        );
    });

    it('Should generate signed package', function (done) {
        buildCommand += buildOptions.join(' ');
        cmd.get(
            buildCommand,
            function(err, data, stderr){
                expect(data).to.match(/Signed successfully/);
                done();
            }
        );
    });

});
