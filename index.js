const xn = {
    ls: {
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        list: function () {
            return JSON.parse(localStorage.getItem(""));
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}
const ls = xn.ls;
$(document).on("input", "input[af_path]", function () {
    const element = $(this);
    value = element.val();
    const [fun, tree, ...path] = element.attr("af_path").split(/:|>/).filter(Boolean);
 
    if (fun == "ls") {
        let localStorageTree = ls.get(tree);
        localStorageTree = localStorageTree ? localStorageTree : {};
        let currentObj = localStorageTree;
        for (let i = 0; i < path.length - 1; i++) {
            if (!currentObj[path[i]]) {
                currentObj[path[i]] = {};
            }
            currentObj = currentObj[path[i]];
        }
        currentObj[path[path.length - 1]] = value;
        ls.set(tree, localStorageTree);
    }
})
$(document).ready(function () {
    $("input[af_path]").each(function () {
        const element = $(this);
        const [fun, tree, ...path] = element.attr("af_path").split(/:|>/).filter(Boolean);
        if (fun === "ls") {
            let localStorageTree = ls.get(tree);
            if (localStorageTree) {
                localStorageTree = localStorageTree;
                let targetValue = localStorageTree;
                for (const pathItem of path) {
                    if (targetValue[pathItem]) {
                        targetValue = targetValue[pathItem];
                    } else {
                        targetValue = null;
                        break;
                    }
                }
                if (targetValue !== null) {
                    element.val(targetValue);
                }
            }
        }
    });
});
