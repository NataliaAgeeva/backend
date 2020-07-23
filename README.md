# Проект 13: Создание API.REST и базы данных

Разработан базовый backend функционал одностраничного сайта Mesto.

Сервер обрабатывает запросы:

**GET localhost:3000/users** - вывод JSON-объекта с данными всех пользователей  
**GET localhost:3000/users/id** - вывод JSON-объекта для пользователя с определенным **id**  
**POST localhost:3000/users** - создание нового пользователя  
**PATCH localhost:3000/users/me** - обновление профиля текущего пользователя (поля *name* и *about*)  
**PATCH localhost:3000/users/me/avatar** - обновление аватара текущего пользователя (поле *avatar*)  
  
**GET localhost:3000/cards** - вывод JSON-объекта с данными всех карточек  
**POST localhost:3000/cards** - создание новой карточки  
**DELETE localhost:3000/cards/:cardId** - удаление карточки с определенным **cardId**  
**PUT localhost:3000/cards/:cardId/likes** - простановка лайка карточке с определенным **cardId**    
**DELETE localhost:3000/cards/:cardId/likes** - удаление лайка с карточки с **cardId**    

Команды для запуска:

***npm run dev*** - запускает сервер на *localhost:3000* с хот-релоудом  
***npm run start*** - запускает сервер на *localhost:3000*
