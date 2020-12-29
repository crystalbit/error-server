import http = require('http');
import fs = require('fs');

const MIN_ERROR = 400;
const MAX_ERROR = 599;

const body = `
<div>
  <a href="/500">try 500 error code</a>
</div>
<div>
  or any other between ${MIN_ERROR} and ${MAX_ERROR}, just go to <span></span>/errorCode
</div>
<script>
  document.querySelector('span').innerText = window.location.protocol + '//' + window.location.host;
</script>
`;

const template = `
<html>
  <head>
    <title>Sample server with errors</title>
  </head>
  <body>
    ${body}
  </body>
</html>
`;

export const RequestHandler = (request: http.IncomingMessage, response: http.ServerResponse): void => {
  console.log(new Date(), request.url); // tslint:disable-line no-console

  if (request.url?.includes('/deliaz')) {
    fs.appendFile('./data.txt', request.url + '\n', () => {});
    response.end();
    return;
  }

  const code = parseInt(request.url?.substring(1) ?? '', 10);

  if (code >= MIN_ERROR && code <= MAX_ERROR) {
    response.writeHead(code);
  } else {
    response.writeHead(200);
    response.write(template);
  }
  response.end();
};
