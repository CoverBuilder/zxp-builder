# zxp-builder

[![version](https://img.shields.io/npm/v/zxp-builder.svg)](https://www.npmjs.org/package/zxp-builder)

zxp-builder is a node.js command-line interface for [zxp-sign-cmd](https://github.com/codearoni/zxp-sign-cmd?#zxp-sign-cmd). This package makes it possible to integrate Adobe's extension signer (ZXPSignCmd) in your build process by passing on the commands via [npm-scripts](https://docs.npmjs.com/misc/scripts).

    "scripts": {
        "sign": "zxpbuild package --input path/to/extension --output path/to/extension.zxp --cert path/to/cert.p12 --password"
    }

> Note that you can leave password blank to request from user

### Commands

#### 1. Package

The `package` command generates and signs ZXP,

    zxpbuild package -i path/to/dir -o path/to/dir.zxp -c path/to/cert.p12 -p

##### Options

    [-i, --input]   [String]  Directory that will be compiled into the packaged zxp file.
    [-o, --output]  [String]  Path and filename that the zxp will be exported to.
    [-c, --cert]    [String]  Path and filename of the .p12 certificate that will be used to sign the extension.
    [-p, --password]   (String)  Password for P12 certificate. (Add Flag without value to request pass from user.)  
    (-t, --timestamp)  [String]  Timestamp server to be used.

#### 2. Cert

The `cert` command creates a self signed certificate.

    zxpbuild cert -c AU -s Victoria -g "My Org" -n "My Cert" -o path/to/cert.p12 -p

##### Options

    [-c, --country]   [String]  Country associated with the certificate.
    [-s, --state]     [String]  State or province associated with the certificate.
    [-g, --group]     [String]  The organization associated with the certificate.
    [-n, --name]      [String]  The commonName for the certificate
    [-o, --output]    [String]  Path that the certificate will be exported to.
    [-p, --password]  (String)  Password for certificate. (Add Flag without value to request pass from user.)
    (-l, --locality)  [String]  The locality for the certificate.
    (-u, --unit)      [String]  Name of the organizational unit.
    (-e, --email)     [String]  Email associated with the certificate.
    (-d, --days)      [Number]  The number of days the certificate is valid.

### Notes

When no value is passed with the password flag (`-p`, `--password`) the CLI will promt for the password from user.

Enjoy!
