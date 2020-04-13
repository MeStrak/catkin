export function GetUserGroups(user: any): string[] {
  var groups: string[] = [];
  user['https://catkin.dev/permissions'].forEach(element => {
    groups.push(element.group);
  });
  return groups;
}
