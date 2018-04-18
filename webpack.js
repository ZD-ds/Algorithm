(function(modules){
    var installedModules={};//缓存区
    function _webpack_require_(moduleId){
        if(installedModules[moduleId])return installedModules[moduleId].exports;
        var module=installedModules[moduleId]={
            exports:{},
            id:moduleId,
            loaded:false
        };
        modules[moduleId].call(module.exports,module,module.exports,_webpack_require_);
        module.loaded=true;
        return module.exports;
    }
    _webpack_require_.m=modules;
    return _webpack_require_(0);
})([function(module,exports,_webpack_require_){
    var text=_webpack_require_(1);
    console.log(text);
},function(module,exports){
    module.exports="hello world";
}]);