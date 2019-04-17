var TreeUtils = function (treeList, menus, components) {
  if (!treeList || treeList.length == 0) {
    return menus;
  }
  for (var i = 0; i < treeList.length; i++) {
    var tree = treeList[i];
    var menu = {};
    if (tree && tree["dataUrl"]) {
      menu = {
        path: tree["dataUrl"],
        component: components[tree["menuCode"]],
        children: []
      };
      if (tree && tree.childs && tree.childs.length > 0) {
         TreeUtils(tree.childs, menu.children,components);
      }
      menus.push(menu);
    }
  }
};

export default TreeUtils;
