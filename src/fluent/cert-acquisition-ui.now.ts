import { default_view, Form, List } from "@servicenow/sdk/core";

Form({
  table: "x_711398_se_cert_acquisition",
  view: default_view,
  sections: [
    {
      caption: "Cert Acquisition",
      content: [
        {
          layout: "two-column",
          leftElements: [{ field: "certificate", type: "table_field" }],
          rightElements: [{ field: "certificate.product_line", type: "table_field" }],
        },
      ],
    },
  ],
});

List({
  table: "x_711398_se_cert_acquisition",
  view: default_view,
  columns: ["certificate", "certificate.product_line"],
});
