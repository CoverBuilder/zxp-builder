# zxp-builder

> Another Adobe Extension Packager

zxp-builder provides a simple node.js command-line interface for [zxp-sign-cmd](https://github.com/codearoni/zxp-sign-cmd?#zxp-sign-cmd).

## Usage

    zxpbuild -i path/to/dir -o path/to/file.zxp -c path/to/cert.p12 -p

**Options**

    -v, --version         Output the version number.
    -i, --input  [value]  Directory that will be compiled into the packaged zxp file.
    -o, --output [value]  Path and filename that the zxp will be exported to.
    -c, --cert   [value]  Path and filename of the .p12 certificate that will be used to sign the extension.
    -t, --tsa    [value]  Timestamp server to be used.
    -p, --pass   [value*] Password for P12 certificate. (Add Flag without value to request pass from user.)
    -h, --help            Output usage information.  

