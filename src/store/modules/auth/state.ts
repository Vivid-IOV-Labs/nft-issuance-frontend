
export interface AuthState {
  currentRole: string;
}

const state = (): AuthState => ({
  currentRole: "",
});

export default state;
