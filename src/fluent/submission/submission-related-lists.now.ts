import { Record } from "@servicenow/sdk/core";

const submissionRelatedLists = Record({
  $id: Now.ID["submission-related-lists"],
  table: "sys_ui_related_list",
  data: {
    name: "x_711398_se_submission",
    view: "Default view",
  },
});

Record({
  $id: Now.ID["submission-skill-assessment-related-list"],
  table: "sys_ui_related_list_entry",
  data: {
    list_id: submissionRelatedLists,
    position: 0,
    related_list: "x_711398_se_skill_assessment.submission",
  },
});

Record({
  $id: Now.ID["skill-assessment-related-list-control"],
  table: "sys_ui_list_control",
  data: {
    name: "x_711398_se_submission",
    related_list: "x_711398_se_skill_assessment.submission",
    omit_new_button: true,
    omit_edit_button: true,
    list_edit_insert_row: false,
  },
});

Record({
  $id: Now.ID["submission-cert-acquisition-related-list"],
  table: "sys_ui_related_list_entry",
  data: {
    list_id: submissionRelatedLists,
    position: 1,
    related_list: "x_711398_se_cert_acquisition.submission",
  },
});

Record({
  $id: Now.ID["cert-acquisition-related-list-control"],
  table: "sys_ui_list_control",
  data: {
    name: "x_711398_se_submission",
    related_list: "x_711398_se_cert_acquisition.submission",
    omit_edit_button: true,
    list_edit_insert_row: false,
  },
});
