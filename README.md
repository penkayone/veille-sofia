# Veille

Предложение для Софии: бот, который обходит семь французских площадок
с вакансиями и присылает в Telegram только то, чего не было вчера.

Страница: https://penkayone.github.io/veille-sofia/

## Структура

```
index.html              предложение
assets/css/styles.css   стили предложения
assets/js/app.js        схема лучей, терминал, карточки, графики
shema/index.html        схема состояния: что готово, чего нет
shema/styles.css        стили схемы
```

Две страницы:

- https://penkayone.github.io/veille-sofia/ предложение
- https://penkayone.github.io/veille-sofia/shema/ состояние работ

Внешние зависимости: шрифты Google и ApexCharts с cdnjs, подключён
с проверкой целостности. Своей сборки нет, страница открывается как есть.

## Локальный запуск

```bash
python3 -m http.server 8000
```

Дальше `http://localhost:8000`.
