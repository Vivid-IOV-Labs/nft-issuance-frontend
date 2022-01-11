import { AuthState } from "./state";
function withRole(currentRole: string, roles: string[]) {
    roles.includes(currentRole || "");
    return roles.includes(currentRole || "");
}
const getCurrentRole = (state: AuthState): string => state.currentRole;
const isBrandWorker = (state: AuthState): boolean => withRole(state.currentRole, ["brand/worker"])
const isBrandManager = (state: AuthState): boolean => withRole(state.currentRole, ["brand/manager"])
const isAdminWorker = (state: AuthState): boolean => withRole(state.currentRole, ["admin/worker"])
const isPublic = (state: AuthState): boolean => withRole(state.currentRole, ["public"])
const all = JSON.stringify([
    "created",
    "approved",
    "rejected",
    "issued",
    "claiming",
    "delivered",
]);
const canSee = (state: AuthState) =>
    isBrandWorker(state)
        ? all
        : isBrandManager(state)
            ? all
            : isAdminWorker(state)
                ? JSON.stringify(["approved", "issued", "claiming", "delivered"])
                : JSON.stringify(["issued", "claiming"]);
export default {
    getCurrentRole,
    isBrandWorker,
    isBrandManager,
    isAdminWorker,
    isPublic,
    canSee
}
