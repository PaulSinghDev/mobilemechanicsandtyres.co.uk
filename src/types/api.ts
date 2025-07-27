export type GenericApiResponse<Data, Error = string> = {
  success: boolean;
  data: Data | null;
  error: Error | null;
};
