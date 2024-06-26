# Дополниетельные фишки
## Оглавление
- [JavaScript](#javascript)
- [SCSS](#scss)
___
## JavaScript
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
## SCSS
### utils/mixins
Перед исполььзованием не забываем подключить `@import './utils/mixins`

___
#### @mixin google-font
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