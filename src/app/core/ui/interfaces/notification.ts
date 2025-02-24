export interface Notification {
  id?: number;
  title: string;
  description: string;
  dt_created: Date;
  timeDifference?: string;
  is_open?: boolean;
}
