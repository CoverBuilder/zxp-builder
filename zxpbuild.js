#!/usr/bin/env node

var zxpSignCmd = require('zxp-sign-cmd');
var zxpbuild   = require('commander');
var readline   = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    stdoutMuted: false
});

function requestPassBefore(cmd, options) {
    rl.stdoutMuted = true;

    rl.question('Certificate Password: ', (password) => {
        rl.output.write('\r\n\r\n');
        rl.close();
        options.password = String(password);
        cmd(options);
    });

    rl._writeToOutput = function _writeToOutput( stringToWrite ) {
        if (rl.stdoutMuted)
            rl.output.write('*');
        else
            rl.output.write(stringToWrite);
    };
};

function sign(options) {
    zxpSignCmd.sign(options, function (error, result) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log(result);
            process.exit(0);
        };
    });
};

function selfSignedCert(options) {
    zxpSignCmd.selfSignedCert(options, function (error, result) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log(result);
            process.exit(0);
        };
    });
};

zxpbuild.version('0.2.0', '-v, --version');

zxpbuild.command('package <dir> <zxpfile> <p12>')
  .description('Package and sign a directory')
  .option('-t, --timestamp [value]', 'Timestamp server to be used.')
  .option('-p, --password  [value]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .action(function (dir, zxpfile, p12, options) {
      options.input  = dir;
      options.output = zxpfile;
      options.cert = p12;
      if(options.password === true) {
          // User added the --pass flag without value
          requestPassBefore(sign,options);
      } else {
          sign(options);
      };
  });

zxpbuild.command('cert <filepath> <country> <province> <org> <name>')
  .description('Generate a self-signed certificate')
  .option('-l, --locality  [value]', 'The locality for the certificate.')
  .option('-u, --orgUnit   [value]', 'Name of the organizational unit.')
  .option('-e, --email     [value]', 'Email associated with the certificate.')
  .option('-d, --days      [value]', 'The number of days the certificate is valid.')
  .option('-p, --password  [value]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .action(function (filepath, country, province, org, name, options) {
      options.output   = filepath;
      options.country  = country;
      options.province = province;
      options.org      = org;
      options.name     = name;
      if(options.password === true) {
          // User added the --pass flag without value
          requestPassBefore(selfSignedCert,options);
      } else {
          selfSignedCert(options);
      };
  });

zxpbuild.parse(process.argv);
