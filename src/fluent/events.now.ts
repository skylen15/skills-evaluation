import { Record } from "@servicenow/sdk/core";

const SUBMISSION_TABLE = "x_711398_se_submission";

export const eventSubmissionCreated = Record({
  $id: Now.ID["event-submission-created"],
  table: "sysevent_register",
  data: {
    suffix: "submission.created",
    event_name: "x_711398_se.submission.created",
    description: "Fired when a Submission is created in Draft",
    table: SUBMISSION_TABLE,
    fired_by: "Business Rule: Queue Submission Lifecycle Event",
    priority: 100,
  },
});

export const eventSubmissionSubmitted = Record({
  $id: Now.ID["event-submission-submitted"],
  table: "sysevent_register",
  data: {
    suffix: "submission.submitted",
    event_name: "x_711398_se.submission.submitted",
    description: "Fired when a Submission enters Submitted",
    table: SUBMISSION_TABLE,
    fired_by: "Business Rule: Queue Submission Lifecycle Event",
    priority: 100,
  },
});

export const eventSubmissionPmApproved = Record({
  $id: Now.ID["event-submission-pm-approved"],
  table: "sysevent_register",
  data: {
    suffix: "submission.pm_approved",
    event_name: "x_711398_se.submission.pm_approved",
    description: "Fired when a PM approves a Submission to Reviewed",
    table: SUBMISSION_TABLE,
    fired_by: "Business Rule: Queue Submission Lifecycle Event",
    priority: 100,
  },
});

export const eventSubmissionPmRejected = Record({
  $id: Now.ID["event-submission-pm-rejected"],
  table: "sysevent_register",
  data: {
    suffix: "submission.pm_rejected",
    event_name: "x_711398_se.submission.pm_rejected",
    description: "Fired when a PM rejects a Submission back to Draft",
    table: SUBMISSION_TABLE,
    fired_by: "Business Rule: Queue Submission Lifecycle Event",
    priority: 100,
  },
});

export const eventSubmissionCoeRejected = Record({
  $id: Now.ID["event-submission-coe-rejected"],
  table: "sysevent_register",
  data: {
    suffix: "submission.coe_rejected",
    event_name: "x_711398_se.submission.coe_rejected",
    description: "Fired when a CoE Head rejects a Submission back to Draft",
    table: SUBMISSION_TABLE,
    fired_by: "Business Rule: Queue Submission Lifecycle Event",
    priority: 100,
  },
});
