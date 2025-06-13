export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecret-hningqwdfg40feR0WEwr0w Q54464846VSF0VVVV0RV0Rfe5E65E1FE41W6165we6511ew110c6';
export const TOKEN_EXPIRY = '7d';
export const ROLES = {
  ASHA: 'asha',
  ANM: 'anm',
  PARENT: 'parent',
};
export const Z_SCORE_THRESHOLDS = {
  NORMAL: -2,
  MAM: -3,
};