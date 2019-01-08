#!/usr/bin/env node

var zxpSignCmd = require('zxp-sign-cmd');
var zxpbuild   = require('commander');
var readline   = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

zxpbuild
  .version('0.1.0', '-v, --version', 'Output the version number.')
  .option('-i, --input  [value]', 'Directory that will be compiled into the packaged zxp file.')
  .option('-o, --output [value]', 'Path and filename that the zxp will be exported to.')
  .option('-c, --cert   [value]', 'Path and filename of the .p12 certificate that will be used to sign the extension.')
  .option('-t, --tsa    [value]', 'Timestamp server to be used.')
  .option('-p, --pass   [value]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .parse(process.argv);

function sign() {
   zxpSignCmd.sign({
        input: zxpbuild.input,
        output: zxpbuild.output,
        cert: zxpbuild.cert,
        password: zxpbuild.pass,
        timestamp: zxpbuild.tsa
    }, function (error, result) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log(result);
            process.exit(0);
        };
    });
};

// Only prompt if there is a --pass flag without value.
if( typeof zxpbuild.pass === 'boolean' ) {
    rl.stdoutMuted = true;
    rl.question('Certificate Password: ', (pass) => {
        zxpbuild.pass = String(pass);
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
