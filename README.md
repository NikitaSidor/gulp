# Проект Gulp

Этот проект использует Gulp для автоматизации различных задач, таких как компиляция SCSS в CSS, минификация JavaScript, и т.д.

## Оглавление

- [Версии](#Версии)
- [Установка](#Установка)
- [Использование](#Использование)
- [Дополниетельные фишки](#дополниетельные_фишки)

## Версии
1) node.js - v21.7.3
2) npm - v10.5.2

Чтобы узнать устаревшие верссии пакетов используй:
```bash
npm outdated
```
___
## Установка

Клонируйте репозиторий:

```bash
git clone https://github.com/NikitaSidor/gulp.git
```

Перейдите в каталог проекта:

```bash
cd gulp
```

Установите зависимости:

```bash
npm install
```
___
## Использование

### Запуск задачи по умолчанию

Для запуска задачи по умолчанию (например, сборка проекта и запуск слежения за изменениями) выполните:

```bash
gulp
```

### Сборка проекта

Для сборки проекта выполните:

```bash
gulp build
```

### Запуск слежения за изменениями

Для запуска слежения за изменениями и автоматической пересборки проекта при изменениях выполните:

```bash
gulp watch
```

## Описание задач

- `html`: Компиляция HTML файлов с использованием Panini.
- `css`: Компиляция и минификация файлов SCSS в CSS.
- `js`: Минификация JavaScript файлов.
- `images`: Копирование изображений.
- `fonts`: Копирование шрифтов.
- `clean`: Удаление папки dist перед каждой сборкой.
- `serve`: Запуск локального сервера с помощью BrowserSync.
___
## Дополниетельные фишки
### JavaScript
Объединение всех файлов js в один
```javascript
function js(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: '[name].js',
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
```
А если не хотите объединять то используйте этот код:
```javascript
        function js(cb) {
    return src(path.src.js, {base: srcPath + 'assets/js/'})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "JS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: '[name].js',
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));

    cb();
}
```
___
### SCSS
#### utils/mixins
Перед исполььзованием не забываем подключить `@import './utils/mixins`
##### @mixin google-font 
Подключает шрифты scss:
`массив((толщина, стиль): 'путь к шрифту', 2 шрифт, 3 шрифт)`

Пример подключения google-font
```scss
$font-paths-poppins: (
                (100, normal): '../fonts/Poppins/Poppins-Thin.ttf',
                (100, italic): '../fonts/Poppins/Poppins-ThinItalic.ttf',
                (200, normal): '../fonts/Poppins/Poppins-ExtraLight.ttf',
                (200, italic): '../fonts/Poppins/Poppins-ExtraLightItalic.ttf',
                (300, normal): '../fonts/Poppins/Poppins-Light.ttf',
                (300, italic): '../fonts/Poppins/Poppins-LightItalic.ttf',
                (400, normal): '../fonts/Poppins/Poppins-Regular.ttf',
                (400, italic): '../fonts/Poppins/Poppins-Italic.ttf',
                (500, normal): '../fonts/Poppins/Poppins-Medium.ttf',
                (500, italic): '../fonts/Poppins/Poppins-MediumItalic.ttf',
                (600, normal): '../fonts/Poppins/Poppins-SemiBold.ttf',
                (600, italic): '../fonts/Poppins/Poppins-SemiBoldItalic.ttf',
                (700, normal): '../fonts/Poppins/Poppins-Bold.ttf',
                (700, italic): '../fonts/Poppins/Poppins-BoldItalic.ttf',
                (800, normal): '../fonts/Poppins/Poppins-ExtraBold.ttf',
                (800, italic): '../fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
                (900, normal): '../fonts/Poppins/Poppins-Black.ttf',
                (900, italic): '../fonts/Poppins/Poppins-BlackItalic.ttf'
);

@include google-font("Poppins", $font-paths-poppins);
```