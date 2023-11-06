export interface FormInputProps {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SignUpFormProps {
  onBack: () => void;
}

export interface Config {
  auth0Domain: string;
  clientId: string;
  apiIdentifier: string;
}
