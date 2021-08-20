# tinkoff-invest-backend

Это бекенд для двух клиентов — телеграм бота и сайта. Сайт можно не запускать, если он не нужен. Бекенд можно использовать только для телеграм бота. Репозиторий с фронтендом [здесь](https://github.com/termitkin/tinkoff-invest-frontend)

- Докер образ [бекенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-backend)
- Докер образ [фронтенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-frontend)

### Список команд для бота

```
/get_balance - Узнать баланс (доход за всё время)
/get_portfolio - Ожидаемый доход по каждой бумаге в портфеле
/get_orders - Список активных заявок
/get_usd - Последняя цена доллара
/get_eur - Последняя цена евро
/get_stock_price - Последняя цена бумаги по тикеру. Пример - /get_stock_price AAPL
/cancel_order - Отменить заявку. Пример - /cancel_order 25446301566. Номер заявки можно взять из /get_orders
/place_limit_order - Разместить лимитную заявку. Порядок параметров важен. Пример - /place_limit_order ozon 1 sell 4200
/place_market_order - Разместить рыночную заявку. Порядок параметров важен. Пример - /place_market_order ozon 1 sell
/get_help - Вывести список всех команд
```

### Функции сайта

- Продажа и покупка бумаг
- Отображение портфеля
- Список лимитных заявок
- Стакан заявок
- Избранное

### Связать телеграм бота с этим бекендом

1. Нужно запустить бекенд
2. Нужно создать бота. Это можно сделать написав в личку [@BotFather](https://t.me/BotFather)
3. Получить у @BotFather API Token (здесь он называется BOT_TOKEN)
4. Открыть в браузере эту ссылку подставив свои данные: `https://api.telegram.org/botBOT_TOKEN/setWebhook?url=https://mysite.com/api/BOT_TOKEN&ip_address=my_server_ip_address`

### Запуск фронтенда и бекенда вместе

1. Скачать [docker-compose.yml](https://gist.github.com/termitkin/966ebfb4cfa71057cdbde19bbab0afb6)
2. Рядом с `docker-compose.yml` нужно положить файл `.env`, в котором должны быть три переменные: BOT_TOKEN, OWNER_ID и secretToken
3. Выполнить `docker-compose up -d`

### Бекенду нужно передать три переменные окружения

```
BOT_TOKEN - токен телеграм бота
OWNER_ID - id владельца бота в телеграме. В телеграме все боты публичные. То есть обращаться к ним может кто угодно. Поэтому нужно указывать id владельца, чтобы управлять ботом мог только владелец бота
secretToken - токен Тинькофф Инвестиций
```

### Команда для сборки бекенда в докер образ

```
docker build -t termitkin/tinkoff-invest-backend:latest .
```

### Команда для запуска контейнера с бекендом

```
docker run -d -p 3025:3025 -p 3026:3026 --restart unless-stopped --name tinkoff-invest-backend -e secretToken=TINKOFF_SECRET_TOKEN -e BOT_TOKEN=TELEGRAM_BOT_TOKEN -e OWNER_ID=TELEGRAM_OWNER_ID termitkin/tinkoff-invest-backend:latest
```

### Блоки в конфиге nginx, которые нужны для контейнеров с бекендом и фронтендом:

```
# Tinkoff invest frontend
location ^~ /tinkoff-invest/BOT_TOKEN {
  proxy_pass http://localhost:3500/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

# Tinkoff invest api
location ^~ /api/BOT_TOKEN {
  proxy_pass http://localhost:3025/api;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

# Tinkoff invest ws
location ^~ /ws/BOT_TOKEN {
  proxy_pass http://localhost:3026/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```
