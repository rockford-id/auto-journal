// Interaksi mockup statis: tab/filter (data-tab, data-panel, data-row),
// langkah simulasi (data-step), dan ganti tema portal-ui (light/dark/warm).
(function () {
    var active = {};

    function tabsOf(group) {
        return [].slice.call(document.querySelectorAll('[data-tab^="' + group + ':"]'));
    }

    function keyOf(el, attr) {
        return el.getAttribute(attr).split(':')[1];
    }

    function activate(group, key) {
        active[group] = key;
        tabsOf(group).forEach(function (b) {
            b.classList.toggle('is-active', keyOf(b, 'data-tab') === key);
        });
        document.querySelectorAll('[data-panel^="' + group + ':"]').forEach(function (p) {
            p.hidden = keyOf(p, 'data-panel') !== key;
        });

        var shown = 0;
        var total = 0;
        document.querySelectorAll('[data-row^="' + group + ':"]').forEach(function (r) {
            var visible = key === 'ALL' || keyOf(r, 'data-row') === key;
            r.hidden = !visible;
            if (visible) {
                shown++;
                total += Number(r.getAttribute('data-amount') || 0);
            }
        });
        document.querySelectorAll('[data-count="' + group + '"]').forEach(function (c) {
            c.textContent = shown;
        });
        document.querySelectorAll('[data-total="' + group + '"]').forEach(function (c) {
            c.textContent = total.toLocaleString('id-ID');
        });

        var steps = [].slice.call(document.querySelectorAll('[data-step-item^="' + group + ':"]'));
        var idx = steps.findIndex(function (s) { return keyOf(s, 'data-step-item') === key; });
        steps.forEach(function (s, i) {
            s.classList.toggle('done', i < idx);
            s.classList.toggle('current', i === idx);
        });
    }

    function init() {
        var groups = {};
        document.querySelectorAll('[data-tab]').forEach(function (b) {
            var group = b.getAttribute('data-tab').split(':')[0];
            if (!(group in groups) || b.hasAttribute('data-default')) {
                groups[group] = keyOf(b, 'data-tab');
            }
        });
        Object.keys(groups).forEach(function (g) { activate(g, groups[g]); });

        var saved = null;
        try { saved = localStorage.getItem('smra-theme'); } catch (e) { /* storage diblokir */ }
        if (saved && saved !== 'light') setTheme(saved);
    }

    var THEMES = ['light', 'dark', 'warm'];

    function setTheme(theme) {
        var wrapper = document.getElementById('smra-wrapper');
        THEMES.forEach(function (t) {
            wrapper.classList.remove(t);
            document.body.classList.remove(t);
        });
        if (theme !== 'light') {
            wrapper.classList.add(theme);
            document.body.classList.add(theme);
        }
        try { localStorage.setItem('smra-theme', theme); } catch (e) { /* storage diblokir */ }
    }

    document.addEventListener('click', function (e) {
        var tab = e.target.closest('[data-tab]');
        if (tab) {
            var parts = tab.getAttribute('data-tab').split(':');
            activate(parts[0], parts[1]);
            return;
        }

        var step = e.target.closest('[data-step]');
        if (step) {
            var group = step.getAttribute('data-step-group');
            var keys = tabsOf(group).map(function (b) { return keyOf(b, 'data-tab'); });
            var i = keys.indexOf(active[group]);
            i = step.getAttribute('data-step') === 'next' ? Math.min(keys.length - 1, i + 1) : Math.max(0, i - 1);
            activate(group, keys[i]);
            return;
        }

        if (e.target.closest('[aria-label="Ganti tema"]')) {
            var wrapper = document.getElementById('smra-wrapper');
            var current = THEMES.filter(function (t) { return wrapper.classList.contains(t); })[0] || 'light';
            setTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
        }
    });

    document.addEventListener('DOMContentLoaded', init);
})();
