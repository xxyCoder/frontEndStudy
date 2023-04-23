const dns = require('dns');
dns.lookup('iana.org',(err,address,family) => {
    console.log('IP 地址: %j 地址族: IPv%s', address, family);
});

const options = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED
};
dns.lookup('iana.org',options,(err,address,family) => {
    console.log('IP 地址: %j 地址族: IPv%s', address, family);
});