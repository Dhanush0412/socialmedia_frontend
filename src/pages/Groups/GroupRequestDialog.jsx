import { useGroupDetails } from "../../hooks/group/useGroupDetails";
import { useRejectedMembers } from "../../hooks/group/useRejectedPersons";

export default function GroupRequestDialog({
  open,
  onClose,
  groupid
}) {

  console.log("groupid", groupid);

  const groupQuery = useGroupDetails(groupid);

  const rejectedQuery = useRejectedMembers(groupid);

  console.log(groupQuery);
  console.log(rejectedQuery);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Testing</DialogTitle>
    </Dialog>
  );
}