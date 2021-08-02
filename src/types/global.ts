export interface CustomError {
  message: string;
}

export enum StateTypes {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type States<D> =
  | {
      type: StateTypes.IDLE;
    }
  | {
      type: StateTypes.LOADING;
    }
  | {
      type: StateTypes.SUCCESS;
      data: D;
    }
  | {
      type: StateTypes.ERROR;
      error: CustomError;
    };
