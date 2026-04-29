export interface HeaderFields {
  title: string;
  subtitle: string;
}

export interface HeaderState {
  isVisible: boolean;
  showSearch: boolean;
  showNotifications: boolean;
  showCart: boolean;
  showUser: boolean;
  fields: HeaderFields;
}

export interface UpdateHeaderFieldsPayload {
  title?: string;
  subtitle?: string;
}

export type ToggleableHeaderField =
  | 'showSearch'
  | 'showNotifications'
  | 'showCart'
  | 'showUser';
