import { Record } from "@servicenow/sdk/core";

import { SE_ADMIN_ROLE_NAME } from "./roles.now.ts";
import { skillEvaluationMenu } from "./submission-menu.now.ts";

Record({
  $id: Now.ID["module-se-admin-separator"],
  table: "sys_app_module",
  data: {
    title: "SE Admin",
    application: skillEvaluationMenu,
    link_type: "SEPARATOR",
    roles: [SE_ADMIN_ROLE_NAME],
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
    roles: [SE_ADMIN_ROLE_NAME],
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
    roles: [SE_ADMIN_ROLE_NAME],
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
    roles: [SE_ADMIN_ROLE_NAME],
    active: true,
    order: 330,
  },
});
