# Distinguish PM and CoE Head by group, not by extra roles

The spec grants both Skill Evaluation PM and Skill Evaluation COE the same `se_admin` role, but the first gate (Submitted → Reviewed) is PM and the second (Reviewed → Completed) is CoE Head. We keep one role for ACL and admin modules, and decide who may press which approve/reject action by group membership. Splitting `se_pm` / `se_coe` would be clearer in ACLs but would leave the written spec.
