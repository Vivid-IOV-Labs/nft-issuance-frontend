
export interface AuthState {
  currentRole: string;
}

const state = (): AuthState => ({
  currentRole: "brand/worker",
});

export default state;
