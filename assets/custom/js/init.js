'use strict';

/*
|------------------------------------------------------------------------------
| Initialize Framework7
|------------------------------------------------------------------------------
*/

window.app = new Framework7({
    el: '#app',
    componentUrl: './partials/app.html',
    theme: Survos.theming.setTheme(window.config.theming.theme),
    routes: window.routes,
    store: window.store,
    init: false,
    navbar: {
        mdCenterTitle: true
    },
    toast: {
        closeTimeout: 2500
    }
});

/*
|------------------------------------------------------------------------------
| Extend App Object
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.utils.extend(app, {config: window.config});
    app.utils.extend(app, window.Survos);
});

/*
|------------------------------------------------------------------------------
| Set Package Info
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.package.setId();
    app.package.setVersion();
    app.package.setName();
    app.package.setDescription();
});

/*
|------------------------------------------------------------------------------
| Register Service Worker
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.serviceWorker.register('./service-worker.js', './');
});

/*
|------------------------------------------------------------------------------
| Initialize Local Database
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.storage.localDb.init();
});

/*
|------------------------------------------------------------------------------
| Initialize Theming
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.theming.init();
});

/* Show Message When App Goes Online */
app.on('online', function() {
    app.toast.show({
        text: 'Connected to Internet',
        horizontalPosition: 'center',
        position: 'top',
        cssClass: 'color-green'
    });
});

/* Show Message When App Goes Offline */
app.on('offline', function() {
    app.toast.show({
        text: 'No Internet Connection',
        horizontalPosition: 'center',
        position: 'top',
        cssClass: 'color-red'
    });
});

/* Show Preloader Before Route Is Loaded */
app.on('routerAjaxStart', function(xhr, options) {
    app.preloader.show();
});

/* Hide Preloader After Route Is Loaded */
app.on('routerAjaxComplete', function(xhr, options) {
    app.preloader.hide();
});

/* Show Error If Unable To Load Route */
app.on('routerAjaxError', function(xhr, options) {
    app.toast.show({
        text: 'An error occured while loading page. Please make sure that you are connected to the Internet.',
        horizontalPosition: 'center',
        position: 'bottom',
        cssClass: 'color-red'
    });
});

/* Close Modals Before Page Is Removed */
app.on('pageBeforeRemove', function(page) {
    app.actions.close();
    app.calendar.close();
    app.dialog.close();
    app.notification.close();
    app.picker.close();
    app.popover.close();
    app.popup.close();
    app.sheet.close();
});

app.on('pageInit, pageBeforeIn', function(page) {
    setTimeout(function() {
        app.$('.navbar').each(function(navbarEl, index) {
            app.navbar.size(navbarEl);
        });
    }, 1);
});

app.on('tabMounted, tabInit', function(tabEl, tabRoute) {
    setTimeout(function() {
        app.$('.navbar').each(function(navbarEl, index) {
            app.navbar.size(navbarEl);
        });
    }, 1);
});