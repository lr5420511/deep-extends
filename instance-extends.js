(function(win) {

    win.ExtendsInstance = function(oldIns, newIns, fullProperty, isDeep, propertyChanged) {
        if (!oldIns instanceof Object || oldIns === null) {
            throw new Error("window.ExtendsInstance: oldIns of argument isn't a vaild argument");
        }
        if (!newIns instanceof Object || newIns === null) {
            throw new Error("window.ExtendsInstance: newIns of argument isn't a vaild argument");
        }
        if (typeof fullProperty !== "string") {
            fullProperty = "";
        }
        if (typeof isDeep !== "boolean") {
            isDeep = false;
        }
        for (var newProperty in newIns) {
            if (newIns[newProperty] === oldIns[newProperty]) {
                continue;
            } else {
                var currentFullProperty = fullProperty === "" ? newProperty : fullProperty + "." + newProperty;
                var isDeepExtend = isDeep && newIns[newProperty] instanceof Object && !(newIns[newProperty] instanceof Function);
                oldIns[newProperty] = isDeepExtend ?
                    (oldIns[newProperty] instanceof Object ? oldIns[newProperty] : new newIns[newProperty].__proto__.constructor()) :
                    newIns[newProperty];
                if (!isDeepExtend && propertyChanged instanceof Function) {
                    propertyChanged(oldIns, newProperty, currentFullProperty);
                }
                if (isDeepExtend) {
                    win.ExtendsInstance(oldIns[newProperty], newIns[newProperty], currentFullProperty, isDeep, propertyChanged);
                }
            }
        }
    };

})(window)