import "@servicenow/sdk/global";
import { ImportSet, Record, StringColumn, Table } from "@servicenow/sdk/core";

const STAGING_TABLE = "x_711398_se_skills_staging";

export const x_711398_se_skills_staging = Table({
  name: "x_711398_se_skills_staging",
  label: "Skills Staging",
  extends: "sys_import_set_row",
  schema: {
    u_product_line: StringColumn({ label: "Product Line", maxLength: 80 }),
    u_skills: StringColumn({ label: "Skills", maxLength: 255 }),
  },
});

export const skillsDataSource = Record({
  $id: Now.ID["skills-data-source"],
  table: "sys_data_source",
  data: {
    name: "Skills Excel Data Source",
    type: "File",
    format: "Excel",
    file_retrieval_method: "Attachment",
    header_row: 1,
    sheet_number: 1,
    import_set_table_name: STAGING_TABLE,
    import_set_table_label: "Skills Staging",
  },
});

export const skillsImportSet = ImportSet({
  $id: Now.ID["skills-import-set"],
  name: "Skills Transform Map",
  sourceTable: STAGING_TABLE,
  targetTable: "x_711398_se_skill",
  active: true,
  runBusinessRules: false,
  copyEmptyFields: false,
  createOnEmptyCoalesce: false,
  enforceMandatoryFields: "allFields",
  fields: {
    description: {
      sourceField: "u_skills",
      coalesce: true,
      coalesceCaseSensitive: false,
    },
    product_line: {
      sourceField: "u_product_line",
      referenceValueField: "name",
      choiceAction: "reject",
      coalesce: true,
      coalesceCaseSensitive: false,
    },
    weight: {
      useSourceScript: true,
      sourceScript: "answer = 0;",
    },
  },
});
