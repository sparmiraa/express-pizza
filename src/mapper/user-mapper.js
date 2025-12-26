export function toUserProfileDto(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roles: user.Roles.map((role) => role.name),
  };
}
