scp -r -i mail_server.pem C:\Users\mithl\Documents\angular11\manucontract ubuntu@ec2-13-235-98-204.ap-south-1.compute.amazonaws.com:/

scp -r -i mail_server.pem C:\Users\mithl\Documents\angular11\manucontract ubuntu@ec2-13-235-98-204.ap-south-1.compute.amazonaws.com:/m


ssh -i "mail_server.pem" ubuntu@ec2-13-235-98-204.ap-south-1.compute.amazonaws.com





sudo wget https://nodejs.org/dist/v18.16.0/node-v18.16.0.tar.gz
tar -xvf node-v18.16.0.tar.gz --directory /usr/local --strip-components 1

sudo lsof -nP | grep LISTEN

sudo ufw allow proto tcp from any to any port 4200
sudo iptables -A INPUT -p tcp --dport 4200 -j ACCEPT

fuser -n tcp -k 4200


scp -r -i mail_server.pem C:\Users\mithl\Documents\angular11\manucontract ubuntu@172.31.40.237:/

scp -i yourkeypair.pem source destination

--openssl-legacy-provider 

lt --port 3000

--disable-host-check

sudo kill -9 `sudo lsof -t -i:4200`
sudo kill -9 $(sudo lsof -t -i:4200)
sudo netstat -lpn |grep :4200
sudo kill -9 $(sudo lsof -t -i:80)

export NODE_OPTIONS=--openssl-legacy-provider

ng serve --host 0.0.0.0 --port 4200 --open

pm2 start "ng serve --host 0.0.0.0 --port 4205" --name "name"

ssh -R 4200:localhost:4200 ec2-3-7-57-135.ap-south-1.compute.amazonaws.com


localhost:4200

sudo ufw allow from any to any port 4201 proto tcp

ng serve --host 0.0.0.0 --port 4200 --disable-host-check
