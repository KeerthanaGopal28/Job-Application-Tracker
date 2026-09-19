import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',
};

const BASE_URL = 'http://localhost:5000';
const TOKEN = __ENV.JWT_TOKEN;

export default function () {
  const response = http.get(
    `${BASE_URL}/api/applications?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}