/* eslint import/prefer-default-export: "off" */
import { getUser } from 'console/state/users/selectors';

export function getApprovalRequest(state, id, defaultsTo = null) {
  const approvalRequest = state.approvalRequests.items.get(id);

  if (approvalRequest) {
    const creator = getUser(state, approvalRequest.get('creator_id'));
    const approver = getUser(state, approvalRequest.get('approver_id'));

    return approvalRequest
      .set('creator', creator)
      .remove('creator_id')
      .set('approver', approver)
      .remove('approver_id');
  }

  return defaultsTo;
}
