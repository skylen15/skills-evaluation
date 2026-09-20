import "@servicenow/sdk/global";
import { ImportSet, Record, StringColumn, Table } from "@servicenow/sdk/core";

const STAGING_TABLE = "x_711398_se_certificates_staging";

export const x_711398_se_certificates_staging = Table({
  name: "x_711398_se_certificates_staging",
  label: "Certificates Staging",
  extends: "sys_import_set_row",
  schema: {
    u_product_line: StringColumn({ label: "Product Line", maxLength: 80 }),
    u_certificate: StringColumn({ label: "Certificate", maxLength: 255 }),
  },
});

export const certificatesDataSource = Record({
  $id: Now.ID["certificates-data-source"],
  table: "sys_data_source",
  data: {
    name: "Certificates Excel Data Source",
    type: "File",
    format: "Excel",
    file_retrieval_method: "Attachment",
    header_row: 1,
    sheet_number: 1,
    import_set_table_name: STAGING_TABLE,
    import_set_table_label: "Certificates Staging",
  },
});

export const certificatesImportSet = ImportSet({
  $id: Now.ID["certificates-import-set"],
  name: "Certificates Transform Map",
  sourceTable: STAGING_TABLE,
  targetTable: "x_711398_se_certificate",
  active: true,
  runBusinessRules: false,
  copyEmptyFields: false,
  createOnEmptyCoalesce: false,
  enforceMandatoryFields: "allFields",
  fields: {
    name: {
      sourceField: "u_certificate",
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
  },
});
