export function getRole(): string | null {
  return localStorage.getItem("user-role");
}
export function withRole(roles: string[]): boolean {
  roles.includes(getRole() || "");
  return roles.includes(getRole() || "");
}

export const isBrandWorker = withRole(["brand/worker"]);
export const isBrandManager = withRole(["brand/manager"]);
export const isAdminWorker = withRole(["admin/worker"]);
export const isPublic = withRole(["public"]);
