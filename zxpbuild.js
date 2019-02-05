#!/usr/bin/env node

var zxpSignCmd = require('zxp-sign-cmd');
var readline = require('readline');
var cli = require('commander');
var fs = require('fs');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var zxpbuild = {
    version: require('./package').version
};

zxpbuild.unlinkOutput = function( options, errStr ) {
    if(options.output) {
      fs.unlink(options.output, function(err) {
        if(err && err.code !== 'ENOENT') {
            // Maybe we don't have enough permission?
            throw new Error( errStr );
        };
      });
    };
};

zxpbuild.requestPassBefore = function( cmd, options ) {

    rl.stdoutMuted = true;

    rl.question('Certificate Password: ', ( password ) => {
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

zxpbuild.wrapStrings = function( obj, stringProps ) {
    // Make sure string properties with spaces are wrapped in quotes.
    for (var i = 0; i < stringProps.length; i++) { 
        if ( obj.hasOwnProperty(stringProps[i]) ) {
            var strVal = obj[stringProps[i]];
            if (typeof(strVal) !== 'string') {
              continue;
            };
            strVal = strVal.trim();
            if( strVal.indexOf(' ') >= 0 && !/^["'].*["']$/g.test(strVal) ){
                obj[stringProps[i]] = '\"' + strVal + '\"';
            };
        };
    };
    return obj;
};

zxpbuild.sign = function( options ) {
    // zxpSignCmd does not over-write existing packages
    // we do!
    zxpbuild.unlinkOutput( options, "Could not overwrite existing package." );

    zxpSignCmd.sign(options, function ( error, result ) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log(result);
            process.exit(0);
        };
    });
};

zxpbuild.selfSignedCert = function( options ) {
    // zxpSignCmd does not over-write existing certificates
    // we do!
    zxpbuild.unlinkOutput( options, "Could not overwrite existing certificate." );

    // Make sure string properties with spaces are wrapped in quotes.
    var stringProps = ["state","group","name","orgUnit"];

    zxpSignCmd.selfSignedCert(zxpbuild.wrapStrings(options, stringProps), function ( error, result ) {
        if(error && typeof error.message === 'string') {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log(result);
            process.exit(0);
        };
    });
};

cli.version(zxpbuild.version, '-v, --version');

cli.command('package')
  .description('Package and sign a directory')
  .option('-i, --input <input>', 'Directory that will be compiled into the packaged zxp file.')
  .option('-o, --output <output>', 'Path and filename that the zxp will be exported to.')
  .option('-c, --cert <cert>', 'Path and filename of the .p12 certificate that will be used to sign the extension.')
  .option('-t, --timestamp [timestamp]', 'Timestamping server to be used.')
  .option('-p, --password [password]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .action(function ( options ) {
      if(options.password === true) {
          // User added the --pass flag without value
          zxpbuild.requestPassBefore(zxpbuild.sign, options);
      } else {
          zxpbuild.sign(options);
      };
  });

cli.command('cert')
  .description('Generate a self-signed certificate')
  .option('-o, --output <output>', 'The file path to save certificate.')
  .option('-c, --country <country>', 'Country associated with the certificate.')
  .option('-s, --state <state>', 'State or province associated with the certificate.')
  .option('-g, --group <group>', 'The group/organization associated with the certificate.')
  .option('-n, --name <name>', 'Common name for certificate.')
  .option('-l, --locality [locality]', 'The locality for the certificate.')
  .option('-u, --orgUnit [orgUnit]', 'Name of the organizational unit.')
  .option('-e, --email [email]', 'Email associated with the certificate.')
  .option('-d, --days [days]', 'The number of days the certificate is valid.')
  .option('-p, --password [password]', 'Password for P12 certificate. (Add Flag without value to request password from user.)')
  .action(function ( options ) {
      options.province = options.state;
      options.org      = options.group;
      if(options.password === true) {
          // User added the --pass flag without value
          zxpbuild.requestPassBefore(zxpbuild.selfSignedCert, options);
      } else {
          zxpbuild.selfSignedCert(options);
      };
  });

cli.parse(process.argv);
