export interface MessageChat {
  id?: number;
  senderName?: string;
  idReceiver?: string
  message?: string;
  date?: Date;
  role?: string;
  isShowed?: boolean;

}
