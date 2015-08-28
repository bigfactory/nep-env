
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('./lib/util');

var isWin = /^win/.test(process.platform);
var isNodeWebkit = process.__node_webkit || process.versions['node-webkit'];
var extNodePaths = [];

var PROFILEPATH;
var NEPNODEPATH;
var homePath;

//========================PROFILEPATH
if(process.env.NEPPATH){
    PROFILEPATH = process.env.NEPPATH;
}
else{
    homePath = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    PROFILEPATH = path.join(homePath, '.nep');
}

mkdirp.sync(PROFILEPATH);

exports.PROFILEPATH = PROFILEPATH;
//========================PROFILEPATH

//========================extNodePath
if(isNodeWebkit){
    if(isWin){

    }
    else{
        extNodePaths.unshift('/usr/local/lib/node_modules');
    }
}

if(process.env.NEPNODEPATH){
    NEPNODEPATH = process.env.NEPNODEPATH.split(path.delimiter);
    extNodePaths = extNodePaths.concat(NEPNODEPATH);
}

for(var i = 0, len = extNodePaths.length; i < len; i++){
    module.paths.unshift(extNodePaths[i]);
}
//========================extNodePath

exports.lookup = function(prefix, name){
    var name = util.toArray(arguments).join('-');

    try {
        require.resolve(name);
    }
    catch (e) {
        return false;
    }

    return true;
};





