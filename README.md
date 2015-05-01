# DribbbleFolio
> Dribbble Portfolio Page developed with Vanilla JS

![](screenshot.png)

## Motivation
I created a [Vanilla JS](http://vanilla-js.com/) version based on the original [DribbbleFolio](https://dribbble.com/shots/2035170-DribbbleFolio-Dribbble-Portfolio-HTML-Template-Free-Download).

## How to use?
DribbbleFolio is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. Open the [`index.html`](index.html) file and fill javascript variable with your username:

```javascript
DribbbleFolio.init({
    username: 'your_dribbble_username',
    counter: 18
});
```

In file [`request.php`](request.php) you must populate the variable $token with the Token of your app created in [Dribbble API](http://developer.dribbble.com/v1/).

## Contributing

Check [CONTRIBUTING.md](https://github.com/pinceladasdaweb/Nodegram/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/DribbbleFolio/releases) for detailed changelog.

##Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## License

[MIT](LICENSE)