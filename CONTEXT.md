# Skill Evaluation

ECA uses Skill Evaluation so a team member can self-assess ServiceNow skills and certificates, then have that assessment approved in two gates.

## Language

**Skill Evaluation**:
The self-assessment and two-gate approval process (and the ServiceNow application that runs it).
_Avoid_: using this name for a single record (that record is a Submission)

**Submission**:
One self-assessment package for one person: skill ratings, claimed certificates, a score, and an overall level, moving through Draft, Submitted, Reviewed, and Completed. Description is required to submit. A member may submit with every Proficiency Level still Not Applicable (Score 0). Only a PM or CoE Head may delete a Submission; deleting it also deletes its Skill Assessments and Cert Acquisitions.
_Avoid_: Skill Evaluation record, evaluation, request, ticket

**Completed**:
The terminal state of a Submission after the CoE Head approves. Nobody may edit it, including work notes. Reject at either gate returns the Submission to Draft instead.
_Avoid_: closed, done, approved (approved is a gate action, not a state)

**Member**:
An ECA team member who creates and edits their own Submission. Holds the `se_user` role via the Skill Evaluation User group. Sees only their own Submissions. Does not delete Submissions.
_Avoid_: requester, employee, candidate

**PM**:
An ECA project manager who reviews a Submission after the member submits it (first gate). Holds `se_admin` via the Skill Evaluation PM group. Does not approve or reject a Submission assigned to themselves.
_Avoid_: manager, first approver (unless talking about the gate itself)

**CoE Head**:
The ECA Center of Excellence head who reviews a Submission after the PM (second gate). Holds `se_admin` via the Skill Evaluation COE group. Does not approve or reject a Submission assigned to themselves.
_Avoid_: CoE, admin, second approver (unless talking about the gate itself)

**Skill Assessment**:
One Proficiency Level for one Skill on one Submission. The list is generated with the Submission; members rate skills, they do not add or remove assessments.
_Avoid_: skill row, rating record

**Cert Acquisition**:
One Certificate claimed on one Submission, carrying its Certification number, Certified date, and ServiceNow release. Certificates on a Submission must be unique; a Member may add or remove claims only while the Submission is Draft.
_Avoid_: cert, certification record

**Skill**:
A named ServiceNow capability under a Product Line, rated with a Proficiency Level from 0 to 4.
_Avoid_: competency, capability

**Product Line**:
A grouping of Skills and Certificates (for example ITSM, Business Apps, Platform).
_Avoid_: category, product, module

**Certificate**:
A named credential under a Product Line that a member may claim on a Submission.
_Avoid_: cert, badge

**Proficiency Level**:
How strongly a member claims a Skill: 0 Not Applicable, 1 Conceptual/Trained, 2 Experienced, 3 Expert, 4 Guru.
_Avoid_: rating, score (Score is the Submission total)

**Score**:
The sum of Proficiency Levels on every Skill Assessment of a Submission. A weight on Skill is not part of this sum.
_Avoid_: total, points, overall skill level (that is Level)

**Level**:
The overall band for a Submission: the threshold row whose min score is the highest value still less than or equal to Score (Elementary 15, Pre-intermediate 25, Intermediate 30, Upper intermediate 45, Advanced 60). Score below 15 has no Level. Visible once the Submission is no longer Draft.
_Avoid_: overall skill level, grade, band, proficiency (Proficiency Level is per Skill)

**Valid**:
Whether a Submission is the current official result for that member. True only on Completed; Draft, Submitted, and Reviewed are not Valid. Completing a Submission sets every other Valid Submission for that same assigned member to not valid, so at most one Valid Submission exists per person.
_Avoid_: active, current, latest (unless speaking loosely)

**In-progress Submission**:
A Submission whose state is not Completed. A member may not create another Submission while one is in progress.
_Avoid_: open, active, draft-or-submitted (Draft, Submitted, and Reviewed all count)

**Work notes**:
The review journal and only user-editable Submission field after Draft. A Member, PM, or CoE Head who can read the Submission may add entries while it is Draft, Submitted, or Reviewed; Completed makes the journal read-only.
_Avoid_: comments, notes

**Lifecycle notification**:
An email caused by creation or a gate transition. Creation and either rejection notify the assigned Member; submission notifies active Skill Evaluation PM group members; PM approval notifies active Skill Evaluation COE group members.
_Avoid_: role notification, approver email

**Reference Catalog**:
The authoritative full set of Product Lines, Skills, and Certificates supplied by the original Skills and Certificates spreadsheets. Demo seed records do not constitute the Reference Catalog.
_Avoid_: seed data, demo catalog
