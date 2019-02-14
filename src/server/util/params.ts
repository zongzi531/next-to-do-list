export enum STATUS {
  UNFINISHED = 'UNFINISHED',
  FINISHED = 'FINISHED',
  DELETED = 'DELETED',
}

export enum COLORS {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export const isStatus = new Set([
  STATUS.UNFINISHED,
  STATUS.FINISHED,
  STATUS.DELETED,
]);

export const isColor = new Set([
  COLORS.DEFAULT,
  COLORS.PRIMARY,
  COLORS.SUCCESS,
  COLORS.INFO,
  COLORS.WARNING,
  COLORS.DANGER,
]);
