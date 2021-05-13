import sys
import uuid
import random
import hashlib
from http.server import BaseHTTPRequestHandler, HTTPServer
def sha256(text):
    return hashlib.sha256(text.encode()).hexdigest().upper()
def calculate_hash(tuuid):
    hash = sha256(tuuid)
    return '{}{}'.format(hash[0:4], hash[-4:])
def generate_term_id():
    return '{:07}'.format(random.randint(1, 9999999))
def generate_qrcode():
    tuuid = '{}'.format(uuid.uuid4())
    return 'Banco24Horas/SaqueDigital/v2/{}/{}/{}/BRL{}'.format(tuuid, calculate_hash(tuuid), generate_term_id(), '{20;50;100}')
    # return 'Banco24Horas/SaqueDigital/v2/{}/{}/{}'.format(tuuid, calculate_hash(tuuid), generate_term_id())
class HttpHandle(BaseHTTPRequestHandler):
    def do_GET(self):
        qr_code = generate_qrcode()
        print('QRCode -> {}'.format(qr_code))
        self.send_response(302)
        self.send_header(
            
            'Location', 'https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={}'.format(qr_code))
        self.end_headers()
        return
def start_http_server(port):
    server_address = ('', port)
    httpd = HTTPServer(server_address, HttpHandle)
    # print('server running on {}...'.format(server_address))
    # print('acesse http://localhost:{}/'.format(port))
    # httpd.serve_forever()
    qr_code = generate_qrcode()
    print('{}'.format(qr_code))
def shell_random_qr_code():
    qr_code = generate_qrcode()
    print('{}}'.format(qr_code))
if __name__ == '__main__':
    arg = sys.argv[1] if len(sys.argv) > 1 else 9010
    if arg != 'qr_code':
        start_http_server(arg)
    else:
        shell_random_qr_code()
