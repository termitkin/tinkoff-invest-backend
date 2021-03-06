# tinkoff-invest-backend

Это сервис, который позволяет:

* Размещать лимитные и рыночные заявки на покупку и продажу ценных бумаг на бирже
* Следить за своим портфелем и за общим доходом по всему портфелю
* Узнать цену ценной бумаги

Сервис использует [Тинькофф Инвестиции OpenAPI](https://tinkoffcreditsystems.github.io/invest-openapi/). Чтобы им воспользоваться нужно быть клиентом Тинькофф Инвестиций и получить Токен для OpenAPI. Получить Токен для OpenAPI можно на сайте Инвестиций в настройках.

Пользоваться сервисом можно через:

* Телеграм бота
* Сайт

Сервис состоит из двух частей:

* Фронтенд (react)
* Бекенд (nodejs)

Для работы телеграм бота нужен только бекенд. Для работы сайта нужно запустить и фронтенд и бекенд.

- Докер образ [бекенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-backend)
- Докер образ [фронтенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-frontend)
- Репозиторий с [фронтендом](https://github.com/termitkin/tinkoff-invest-frontend)

### Список команд для бота

```
get_balance - Узнать баланс (доход за всё время)
get_portfolio - Ожидаемый доход по каждой бумаге в портфеле
get_orders - Список активных заявок
get_usd - Последняя цена доллара
get_eur - Последняя цена евро
get_stock_price - Последняя цена бумаги по тикеру. Пример - /get_stock_price AAPL
cancel_order - Отменить заявку. Пример - /cancel_order 25446301566. Номер заявки можно взять из /get_orders
place_limit_order - Разместить лимитную заявку. Порядок параметров важен. Пример - /place_limit_order ozon 1 sell 4200
place_market_order - Разместить рыночную заявку. Порядок параметров важен. Пример - /place_market_order ozon 1 sell
get_help - Вывести список всех команд

Все команды должны начинаться со слеша. Например, /get_usd
```

### Функции сайта

- Продажа и покупка бумаг
- Отображение портфеля
- Список лимитных заявок
- Стакан заявок
- Избранное

### Как пользоваться сервисом через телеграм бота

1. Нужно запустить бекенд
2. Нужно создать бота. Это можно сделать написав в личку [@BotFather](https://t.me/BotFather)
3. Получить у [@BotFather](https://t.me/BotFather) API Token (здесь он называется BOT_TOKEN)
4. Открыть в браузере эту ссылку подставив свои данные: `https://api.telegram.org/botBOT_TOKEN/setWebhook?url=https://mysite.com/api/BOT_TOKEN&ip_address=my_server_ip_address`
5. Чтобы не вписывать команды вручную можно передать список команд из раздела "Список команд для бота" боту [@BotFather](https://t.me/BotFather).

### Запуск бекенда

Бекенду нужно передать три переменные окружения

```
BOT_TOKEN - токен телеграм бота
OWNER_ID - id владельца бота в телеграме. В телеграме все боты публичные. То есть обращаться к ним может кто угодно. Поэтому нужно указывать id владельца, чтобы управлять ботом мог только владелец бота
secretToken - токен Тинькофф Инвестиций
```
Команда для запуска контейнера:

```
docker run -d -p 3025:3025 -p 3026:3026 --restart unless-stopped --name tinkoff-invest-backend -e secretToken=TINKOFF_SECRET_TOKEN -e BOT_TOKEN=TELEGRAM_BOT_TOKEN -e OWNER_ID=TELEGRAM_OWNER_ID termitkin/tinkoff-invest-backend:latest
```

### Запуск фронтенда и бекенда вместе

1. Скачать [docker-compose.yml](https://gist.github.com/termitkin/966ebfb4cfa71057cdbde19bbab0afb6)
2. Рядом с `docker-compose.yml` положить файл `.env`, в котором должны быть три переменные: BOT_TOKEN, OWNER_ID и secretToken
3. Выполнить `docker-compose up -d`

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
