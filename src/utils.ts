export { v1 as uuid } from 'uuid';

export interface Hash<T = any> {
    [key: string]: T;
}
