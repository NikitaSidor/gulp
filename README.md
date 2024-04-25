# Проект Gulp

Этот проект использует Gulp для автоматизации различных задач, таких как компиляция SCSS в CSS, минификация JavaScript, и т.д.

## Оглавление

- [Версии](#Версии)
- [Установка](#Установка)
- [Использование](#Использование)

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

## Дополниетельные фишки
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
А если не хотите удалите эту часть
```javascript
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: '[name].js',
            }
        }))
```