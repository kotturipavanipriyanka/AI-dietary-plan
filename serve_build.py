#!/usr/bin/env python
"""Simple server to serve the production build output.

Usage:
  python -m venv .venv
  .venv\Scripts\activate   # Windows
  python serve_build.py

Then open http://localhost:8000
"""

import http.server
import os
import socketserver

PORT = 8000

if __name__ == '__main__':
    web_dir = os.path.join(os.path.dirname(__file__), 'dist')
    if not os.path.isdir(web_dir):
        raise SystemExit(
            'Build output not found. Run `npm run build` first to generate the `dist/` directory.'
        )
    os.chdir(web_dir)

    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(('', PORT), handler) as httpd:
        print(f'Serving {web_dir} at http://localhost:{PORT}')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down...')
