/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
  status: number;
  body: any;
}

export interface HttpErrors {
  status: number;
  mapToError: (originalErrorBody?: any) => Error;
}
