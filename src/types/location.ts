
export interface KayakLocation {
  id: string;
  name: string;
  displayName: string;
  city?: string;
  country?: string;
  code?: string;
  type?: string;
  iconUrl?: string | null;
}

export interface AutocompleteInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
