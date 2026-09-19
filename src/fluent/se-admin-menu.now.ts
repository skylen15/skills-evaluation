import { Record } from "@servicenow/sdk/core";

import { skillEvaluationMenu } from "./submission-menu.now.ts";

Record({
  $id: Now.ID["module-se-admin-separator"],
  table: "sys_app_module",
  data: {
    title: "SE Admin",
    application: skillEvaluationMenu,
    link_type: "SEPARATOR",
    roles: "x_711398_se.se_admin",
    active: true,
    order: 300,
  },
});

Record({
  $id: Now.ID["module-product-lines"],
  table: "sys_app_module",
  data: {
    title: "Product Lines",
    application: skillEvaluationMenu,
    link_type: "LIST",
    name: "x_711398_se_product_line",
    hint: "Maintain Product Lines",
    roles: "x_711398_se.se_admin",
    active: true,
    order: 310,
  },
});

Record({
  $id: Now.ID["module-skills"],
  table: "sys_app_module",
  data: {
    title: "Skills",
    application: skillEvaluationMenu,
    link_type: "LIST",
    name: "x_711398_se_skill",
    hint: "Maintain Skills",
    roles: "x_711398_se.se_admin",
    active: true,
    order: 320,
  },
});

Record({
  $id: Now.ID["module-levels"],
  table: "sys_app_module",
  data: {
    title: "Levels",
    application: skillEvaluationMenu,
    link_type: "LIST",
    name: "x_711398_se_level",
    hint: "Maintain Score Level thresholds",
    roles: "x_711398_se.se_admin",
    active: true,
    order: 330,
  },
});
