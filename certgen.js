#!/usr/bin/env node

var zxpSignCmd = require('zxp-sign-cmd');
var certgen    = require('commander');
var readline   = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

certgen
  .version('0.1.0', '-v, --version', 'Output the version number.')
  .option('-c, --country   [value]', 'Country associated with the certificate.')
  .option('-s, --state     [value]', 'State or province associated with the certificate.')
  .option('-g, --group     [value]', 'Organization associated with the certificate.')
  .option('-n, --name      [value]', 'Common name for the certificate')
  .option('-o, --output    [value]', 'Path that the certificate will be exported to.')
  .option('-p, --pass      [value]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .option('-l, --locality  [value]', 'The locality for the certificate.')
  .option('-u, --unit      [value]', 'Name of the organizational unit.')
  .option('-e, --email     [value]', 'Email associated with the certificate.')
  .option('-d, --days      [value]', 'The number of days the certificate is valid.')
  .parse(process.argv);

function create() {
    var options = new Object;

    if( certgen.country  ) options.country      = certgen.country;
    if( certgen.state    ) options.province     = certgen.state;
    if( certgen.group    ) options.org          = certgen.group;
    if( certgen.name     ) options.name         = certgen.name;
    if( certgen.pass     ) options.password     = certgen.pass;
    if( certgen.output   ) options.output       = certgen.output;
    if( certgen.locality ) options.locality     = certgen.locality;
    if( certgen.unit     ) options.orgUnit      = certgen.unit;
    if( certgen.email    ) options.email        = certgen.email;
    if( certgen.days     ) options.validityDays = certgen.days;

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

// Only prompt if there is a --pass flag without value.
if( typeof certgen.pass === 'boolean' ) {
    rl.stdoutMuted = true;
    rl.question('Certificate Password: ', (pass) => {
        certgen.pass = String(pass);
        rl.output.write('\r\n');
        create();
        rl.close();
    });

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
            rl.output.write('*');
        else
            rl.output.write(stringToWrite);
    };

} else {
    create();
};
