import { EmailNotification, Record } from "@servicenow/sdk/core";

import { skillEvaluationCoe, skillEvaluationPm } from "./groups.now.ts";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const emailScriptSubmissionLink = Record({
  $id: Now.ID["submission-email-link-script"],
  table: "sys_script_email",
  data: {
    name: "x_711398_se_submission_link",
    new_lines_to_html: false,
    script: `(function runMailScript(current, template, email, email_action, event) {
      var instanceUrl = gs.getProperty('glide.servlet.uri');
      var recordUrl = instanceUrl + '/' + current.getTableName() + '.do?sys_id=' + current.sys_id;
      template.print('<a href="' + recordUrl + '">' + current.getValue('number') + '</a>');
    })(current, template, email, email_action, event);`,
  },
});

export const notificationSubmissionCreated = EmailNotification({
  $id: Now.ID["notification-submission-created"],
  table: SUBMISSION_TABLE,
  name: "Submission Created",
  active: true,
  triggerConditions: {
    generationType: "event",
    eventName: "x_711398_se.submission.created",
  },
  recipientDetails: {
    recipientFields: ["assigned_to"],
  },
  emailContent: {
    subject: "Skill Evaluation ${number} created",
    messageHtml: `<p>Your Skill Evaluation <strong>\${number}</strong> has been created.</p>
<p><strong>Description:</strong> \${description}</p>
<p><strong>Assigned to:</strong> \${assigned_to}</p>
<p><strong>Lifecycle transition:</strong> Created (Draft)</p>
<p>Link: \${mail_script:x_711398_se_submission_link}</p>`,
  },
});

export const notificationSubmissionSubmitted = EmailNotification({
  $id: Now.ID["notification-submission-submitted"],
  table: SUBMISSION_TABLE,
  name: "Submission Submitted",
  active: true,
  triggerConditions: {
    generationType: "event",
    eventName: "x_711398_se.submission.submitted",
  },
  recipientDetails: {
    recipientGroups: [skillEvaluationPm],
  },
  emailContent: {
    subject: "Skill Evaluation ${number} submitted for PM review",
    messageHtml: `<p>Skill Evaluation <strong>\${number}</strong> has been submitted for PM review.</p>
<p><strong>Description:</strong> \${description}</p>
<p><strong>Assigned to:</strong> \${assigned_to}</p>
<p><strong>Lifecycle transition:</strong> Draft &rarr; Submitted</p>
<p>Link: \${mail_script:x_711398_se_submission_link}</p>`,
  },
});

export const notificationSubmissionPmApproved = EmailNotification({
  $id: Now.ID["notification-submission-pm-approved"],
  table: SUBMISSION_TABLE,
  name: "Submission PM Approved",
  active: true,
  triggerConditions: {
    generationType: "event",
    eventName: "x_711398_se.submission.pm_approved",
  },
  recipientDetails: {
    recipientGroups: [skillEvaluationCoe],
  },
  emailContent: {
    subject: "Skill Evaluation ${number} reviewed by PM and awaiting CoE review",
    messageHtml: `<p>Skill Evaluation <strong>\${number}</strong> has been reviewed by PM and awaits CoE review.</p>
<p><strong>Description:</strong> \${description}</p>
<p><strong>Assigned to:</strong> \${assigned_to}</p>
<p><strong>Lifecycle transition:</strong> Submitted &rarr; Reviewed</p>
<p>Link: \${mail_script:x_711398_se_submission_link}</p>`,
  },
});

export const notificationSubmissionPmRejected = EmailNotification({
  $id: Now.ID["notification-submission-pm-rejected"],
  table: SUBMISSION_TABLE,
  name: "Submission PM Rejected",
  active: true,
  triggerConditions: {
    generationType: "event",
    eventName: "x_711398_se.submission.pm_rejected",
  },
  recipientDetails: {
    recipientFields: ["assigned_to"],
  },
  emailContent: {
    subject: "Skill Evaluation ${number} rejected by PM",
    messageHtml: `<p>Your Skill Evaluation <strong>\${number}</strong> was rejected back to Draft by PM.</p>
<p><strong>Description:</strong> \${description}</p>
<p><strong>Assigned to:</strong> \${assigned_to}</p>
<p><strong>Lifecycle transition:</strong> Submitted &rarr; Draft</p>
<p>Link: \${mail_script:x_711398_se_submission_link}</p>`,
  },
});

export const notificationSubmissionCoeRejected = EmailNotification({
  $id: Now.ID["notification-submission-coe-rejected"],
  table: SUBMISSION_TABLE,
  name: "Submission CoE Rejected",
  active: true,
  triggerConditions: {
    generationType: "event",
    eventName: "x_711398_se.submission.coe_rejected",
  },
  recipientDetails: {
    recipientFields: ["assigned_to"],
  },
  emailContent: {
    subject: "Skill Evaluation ${number} rejected by CoE Head",
    messageHtml: `<p>Your Skill Evaluation <strong>\${number}</strong> was rejected back to Draft by CoE Head.</p>
<p><strong>Description:</strong> \${description}</p>
<p><strong>Assigned to:</strong> \${assigned_to}</p>
<p><strong>Lifecycle transition:</strong> Reviewed &rarr; Draft</p>
<p>Link: \${mail_script:x_711398_se_submission_link}</p>`,
  },
});
