import reqwest from 'reqwest';
import { SYNCROMATICS_API_KEY } from '../config';

const SYNCROMATICS_API_BASE = 'https://api.syncromatics.com/portal/';

export function getBusLocation(id, callback) {
  reqwest(`${SYNCROMATICS_API_BASE}routes/${id}/vehicles?api-key=${SYNCROMATICS_API_KEY}`, callback);
}

export function getBuses(callback) {
  reqwest(`${SYNCROMATICS_API_BASE}routes?api-key=${SYNCROMATICS_API_KEY}`, callback);
}
