# zxp-builder

zxp-builder is a node.js command-line interface for [zxp-sign-cmd](https://github.com/codearoni/zxp-sign-cmd?#zxp-sign-cmd). This package makes it possible to integrate Adobe's extension signer (ZXPSignCmd) in your build process by passing on the commands via [npm-scripts](https://docs.npmjs.com/misc/scripts).

    "scripts": {
        "sign": "zxpbuild sign -i path/to/dir -o path/to/file.zxp -c path/to/cert.p12 -p"
    }

### Commands

#### 1. Sign

The `package` command packages and signs a directory.

    zxpbuild package <dir> <zxpfile> <p12>

##### Options

    [-p, --password]    (String)  Password for P12 certificate. (Add Flag without value to request pass from user.)  
    (-t, --timestamp)   [String]  Timestamp server to be used.

    zxpbuild package path/to/dir path/to/extension.zxp path/to/cert.p12 --password


#### 2. Cert

The `cert` command creates a self signed certificate.

    zxpbuild cert <filepath> <country> <province> <org> <name>

##### Options

    [-p, --password]  (String)  Password for certificate. (Add Flag without value to request pass from user.)
    (-l, --locality)  [String]  The locality for the certificate.
    (-u, --unit)      [String]  Name of the organizational unit.
    (-e, --email)     [String]  Email associated with the certificate.
    (-d, --days)      [Number]  The number of days the certificate is valid.

    zxpbuild cert path/to/cert.p12 AU Victoria Corp "Test Cert" -p

### Notes

When the password flag (`-p` or `--password`) is present without value, the CLI will promt for the password on build.

Enjoy!
