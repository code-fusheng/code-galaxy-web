#!/bin/bash
#密码:Tx!code-fusheng
# rsync -avz -e 'ssh -p 22221' --progress .nuxt env.js assets static package.json nuxt.config.js root@42.192.222.62:/usr/share/nginx/code-galaxy-web
rsync -avz -e 'ssh -p 22221' --progress --exclude={'node_modules'} root@42.192.222.62:/usr/share/nginx/code-galaxy-web
