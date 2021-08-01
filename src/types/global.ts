export interface CustomError {
  message: string;
}

export type States<D> =
  | {
      type: 'IDLE';
    }
  | {
      type: 'LOADING';
    }
  | {
      type: 'SUCCESS';
      data: D;
    }
  | {
      type: 'ERROR';
      error: CustomError;
    };
