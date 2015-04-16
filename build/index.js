KISSY.add('kg/dpl-adapter/0.0.1/index',["cookie","json","kg/xtemplate/4.2.0/runtime"],function(S ,require, exports, module) {
 var version = '1.2.7';
var mods = ['ctrl', 'msg','getHelper','xctrl'];
var modules = {};

for(var i=0;i<mods.length;i+=1) {
    modules['market/' + mods[i]] = {
        alias:['tbc/market/'+version+'/'+mods[i]]
    };
}

KISSY.config({
    combine:true,
    packages:[{
        name:"tb-mod",
        path:"//g.alicdn.com/",
        charset:"utf-8"
    }],
    modules: modules
});

function adapterXtemplate(){
    var cookie = require('cookie');
    var json = require('json');
    var XTemplate = require('kg/xtemplate/4.2.0/runtime');
    function noop() {};
    var url = {};
    S.each('href,protocol,host,hostname,port,pathname,search,hash'.split(','),
        function(key) {
            url[key] = location[key];
        }
    );
    url.query = S.unparam(location.search.slice(1));
    var env = {'$env': {
        cookies: cookie,
        JSON: json,
        Math: Math,
        RegExp: RegExp,
        typeof: function(obj) {
            if (obj === null) {return 'null';}
            if (obj === undefined) {return 'undefined';}
            if (Array.isArray(obj)) {return 'array';}
            if (obj instanceof Date) {return 'date';}
            return typeof obj;
        },
        url: url,
        now: +new Date
    }};

    var tags = ['assets', 'tmsBlock', 'tmsInclude', 'tms'];
    S.each(tags, function(tag) {
        XTemplate.addCommand(tag, noop);
    });
    var render = XTemplate.prototype.render;
    XTemplate.prototype.render = function() {
        arguments[0] = new XTemplate.Scope(arguments[0], env);
        return render.apply(this, arguments);
    };
    return XTemplate;
}

var XTemplate = adapterXtemplate();

module.exports = {
    XTemplate: XTemplate
};
});