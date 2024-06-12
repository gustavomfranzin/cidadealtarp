export type EmblemsType = {
  id: number;
  slug: string;
  name: string;
  image: string;
};

export interface EmblemsByUserType {
  name: string;
  email: string;
  capturedEmblems: EmblemsType[];
}

export interface AccountsDetails {
  name: string;
  email: string;
  capturedEmblems: string[];
}
