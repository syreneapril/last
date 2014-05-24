var scaleBody = function (container, mobileWidth) {
    var computedStyles = window.getComputedStyle(container);
    var containerWidth = parseInt(computedStyles.width.replace('px', ''), 10);
    var containerHeight = parseInt(computedStyles.height.replace('px', ''), 10);
    var containerStyle = container.style;
    containerStyle.position = 'absolute';
    containerStyle['-webkit-transform-origin'] = '0 0 0';
    containerStyle.transform = '0 0 0';
    containerStyle.display = 'none';
    var scaleLandscape = function () {
        var availableWidth = document.documentElement.clientWidth;
        var availableHeight = document.documentElement.clientHeight;
        var scaleWidth = availableWidth / containerWidth;
        var scaleHeight = availableHeight / containerHeight;
        var scaleBoth = scaleWidth;
        if (scaleHeight < scaleWidth) {
            scaleBoth = scaleHeight;
        }

        var left = (availableWidth - (containerWidth * scaleBoth)) / 2;
        left = parseInt(left * (1 / scaleBoth), 10);

        var top = (availableHeight - (containerHeight * scaleBoth)) / 2;
        top = parseInt(top * (1 / scaleBoth), 10);

        var scaleTransform = 'scale(' + scaleBoth + ',' + scaleBoth + ')';
        var translateTransform = 'translate(' + left + 'px, ' + top + 'px)';

        containerStyle['-webkit-transform'] = scaleTransform + ' ' +
            translateTransform;
        containerStyle.transform = scaleTransform + ' ' +
            translateTransform;
    };
    var scaleWithPseudoOrientation = function () {
        var rotateTransform = 'rotate(90deg)';
        var availableWidth = document.documentElement.clientWidth;
        var availableHeight = document.documentElement.clientHeight;
        var scaleWidth = availableWidth / containerHeight;
        var scaleHeight = availableHeight / containerWidth;
        var scaleBoth = scaleWidth;
        if (scaleHeight < scaleWidth) {
            scaleBoth = scaleHeight;
        }

        var scaleTransform = 'scale(' + scaleBoth + ',' + scaleBoth + ')';
        var left = (availableWidth - (containerHeight * scaleBoth)) / 2;
        left = parseInt(left * (1 / scaleBoth), 10) + containerHeight;

        var top = (availableHeight - (containerWidth * scaleBoth)) / 2;
        top = parseInt(top * (1 / scaleBoth), 10);

        var translateTransform = 'translate(' + left + 'px, ' + top + 'px)';

        containerStyle['-webkit-transform'] = scaleTransform + ' ' +
            translateTransform + ' ' +
            rotateTransform;
        containerStyle.transform = scaleTransform + ' ' +
            translateTransform + ' ' +
            rotateTransform;
    };

    var scale = function () {
        if ('lockOrientation' in screen) {
            scaleLandscape();
        }
        else {
            var doc = document.documentElement;
            var onMobile = (doc.clientWidth <= mobileWidth);

            if (doc.clientWidth < doc.clientHeight && onMobile) {
                scaleWithPseudoOrientation();
            }
            else {
                scaleLandscape();
            }
        }
    };
    if (screen.lockOrientation) {
        screen.lockOrientation('landscape');
    }
    window.onresize = scale;
    window.addEventListener('orientationchange', scale);
    scale();
	
    setTimeout(function () {
        containerStyle.display = 'block';
    }, 0);

};
