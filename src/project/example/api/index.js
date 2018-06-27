import request, {busyRequest} from '../utils/request';
const busyReq = busyRequest()
export function test (params) {
  return request('/test', params);
}
export function busytest (params) {
  return busyReq('/test', params);
}
