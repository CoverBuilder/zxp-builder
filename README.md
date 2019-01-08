# zxp-builder

> Another Adobe Extension Packager

zxp-builder provides a simple node.js command-line interface for [zxp-sign-cmd](https://github.com/codearoni/zxp-sign-cmd?#zxp-sign-cmd).

## Usage

### 1. Generate Certificate

    certgen -c AU -s Victoria -g Corp -n "Test Cert" -o path/to/cert.p12 -p

#### Options

    [-c, --country]   [String]  Country associated with the certificate.
    [-s, --state]     [String]  State or province associated with the certificate.
    [-g, --group]     [String]  The organization associated with the certificate.
    [-n, --name]      [String]  The commonName for the certificate
    [-o, --output]    [String]  Path that the certificate will be exported to.
    [-p, --pass]      (String)  Password for certificate. (Add Flag without value to request pass from user.)
    (-l, --locality)  [String]  The locality for the certificate.
    (-u, --unit)      [String]  Name of the organizational unit.
    (-e, --email)     [String]  Email associated with the certificate.
    (-d, --days)      [Number]  The number of days the certificate is valid.

### 2. Package and Sign

    zxpbuild -i path/to/dir -o path/to/file.zxp -c path/to/cert.p12 -p

#### Options

    [-i, --input]   [String]  Directory that will be compiled into the packaged zxp file.
    [-o, --output]  [String]  Path and filename that the zxp will be exported to.
    [-c, --cert]    [String]  Path and filename of the .p12 certificate that will be used to sign the extension.
    [-p, --pass]    (String)  Password for P12 certificate. (Add Flag without value to request pass from user.)  
    (-t, --tsa)     [String]  Timestamp server to be used.

**General Options**

    -h, --help                  Output usage information.  
    -v, --version               Output version.  
