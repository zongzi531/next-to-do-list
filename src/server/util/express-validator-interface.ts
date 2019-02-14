import { Location } from 'express-validator/check/location';

export interface IExpressValidatorError {
  location: Location;
  param: string;
  msg: any;
  value: any;
}
