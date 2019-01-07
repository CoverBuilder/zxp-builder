#!/usr/bin/env node

var zxpSignCmd = require('zxp-sign-cmd');
var zxpbuilder = require('commander');
var readline   = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

zxpbuilder
  .version('0.1.0', '-v, --version', 'Output the version number.')
  .option('-i, --input [value]', 'Directory that will be compiled into the packaged zxp file.')
  .option('-o, --output [value]', 'Path and filename that the zxp will be exported to.')
  .option('-c, --cert [value]', 'Path and filename of the .p12 certificate that will be used to sign the extension.')
  .option('-t, --tsa [value]', 'Timestamp server to be used.')
  .option('-p, --pass [value]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .parse(process.argv);

function sign() {
   zxpSignCmd.sign({
        input: zxpbuilder.input,
        output: zxpbuilder.output,
        cert: zxpbuilder.cert,
        password: zxpbuilder.pass,
        timestamp: zxpbuilder.tsa
    }, function (error, result) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
        } else {
            console.log('Done!');
        };
    });
};

// Only prompt if there is a --pass flag without value.
if( typeof zxpbuilder.pass === 'boolean' ) {
    rl.stdoutMuted = true;
    rl.question('Certificate Password: ', (pass) => {
        zxpbuilder.pass = String(pass);
        rl.output.write('\r\n');
        sign();
        rl.close();
    });

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
            rl.output.write('*');
        else
            rl.output.write(stringToWrite);
    };

} else {
    sign();
};
