$(document).ready(function(){
  function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).get().sort(function(a, b) {
      var vA = $(a).find(keySelector).addBack(keySelector).attr(keySelector) || $(keySelector, a).text();
      var vB = $(b).find(keySelector).addBack(keySelector).attr(keySelector) || $(keySelector, b).text();
      return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
  }

  setTimeout(function(){
    $('.results-table h4').each(function(i){
      var self = $(this);
      function getText(file, target) {
        $.ajax({
          url : file,
          context: target,
          dataType: "text",
          success : function (data) {
            target.parent().find(".text").html(data);
          }
        });
      }

      var html = self.html() || '';
      var parentKey = self.parent().attr('data-key') || '';
      var match = null;

      if (parentKey === 'user_agent' || html.includes('User Agent') || html.includes('Agent utilisateur')) {
        match = { file: '/static/results-text/user-agent.txt', group: '1header' };
      } else if (parentKey === 'http_accept' || html.includes('HTTP_ACCEPT')) {
        match = { file: '/static/results-text/http-accept-headers.txt', group: '1header' };
      } else if (parentKey === 'dnt_enabled' || html.includes('DNT') || html.includes('Do Not Track')) {
        match = { file: '/static/results-text/dnt-header.txt', group: '1header' };
      } else if (parentKey === 'plugins' || html.includes('Plugin') || html.includes('modules et plugins')) {
        match = { file: '/static/results-text/browser-plugin-details.txt', group: '2browser' };
      } else if (parentKey === 'cookie_enabled' || html.includes('Cookie') || html.includes('Cookies')) {
        match = { file: '/static/results-text/cookies-enabled.txt', group: '2browser' };
      } else if (parentKey === 'language' || html.includes('Language') || html.includes('Langue')) {
        match = { file: '/static/results-text/language.txt', group: '2browser' };
      } else if (parentKey === 'video' || html.includes('Screen Size') || html.includes("Résolution d'écran")) {
        match = { file: '/static/results-text/screen-size.txt', group: '2browser' };
      } else if (parentKey === 'timezone' || html.includes('Time Zone Offset') || html.includes('Décalage du fuseau')) {
        match = { file: '/static/results-text/time-zone-offset.txt', group: '2browser' };
      } else if (parentKey === 'timezone_string' || html.includes('Time Zone') || html.includes('Fuseau horaire')) {
        match = { file: '/static/results-text/time-zone.txt', group: '2browser' };
      } else if (parentKey === 'ad_block' || html.includes('Ad Block') || html.includes('Bloqueur')) {
        match = { file: '/static/results-text/ad-blocker.txt', group: '2browser' };
      } else if (parentKey === 'supercookies_v2' || html.includes('supercookie') || html.includes('supercookies')) {
        match = { file: '/static/results-text/limited-super-cookie.txt', group: '2browser' };
      } else if (parentKey === 'canvas_hash_v2' || html.includes('canvas') || html.includes('Canvas')) {
        match = { file: '/static/results-text/hash-of-canvas.txt', group: '3fingerprint' };
      } else if (parentKey === 'webgl_hash_v2' || html.includes('Hash of WebGL') || html.includes('WebGL (hash)')) {
        match = { file: '/static/results-text/hash-of-webgl.txt', group: '3fingerprint' };
      } else if (parentKey === 'webgl_vendor_renderer' || html.includes('WebGL Vendor') || html.includes('moteur de rendu WebGL')) {
        match = { file: '/static/results-text/webgl-vendor.txt', group: '3fingerprint' };
      } else if (parentKey === 'fonts_v2' || html.includes('System Fonts') || html.includes('Polices système')) {
        match = { file: '/static/results-text/system-fonts.txt', group: '3fingerprint' };
      } else if (parentKey === 'audio' || html.includes('AudioContext')) {
        match = { file: '/static/results-text/audiocontext.txt', group: '3fingerprint' };
      } else if (parentKey === 'platform' || html.includes('Platform') || html.includes('Plateforme')) {
        match = { file: '/static/results-text/platform.txt', group: '4hardware' };
      } else if (parentKey === 'touch_support' || html.includes('Touch Support') || html.includes('tactile')) {
        match = { file: '/static/results-text/touch-support.txt', group: '4hardware' };
      } else if (parentKey === 'cpu_class' || html.includes('CPU Class') || html.includes('processeur')) {
        match = { file: '/static/results-text/cpu-class.txt', group: '4hardware' };
      } else if (parentKey === 'hardware_concurrency' || html.includes('Hardware Concurrency') || html.includes('concurrence matérielle')) {
        match = { file: '/static/results-text/hardware-concurrency.txt', group: '4hardware' };
      } else if (parentKey === 'device_memory' || html.includes('Device Memory') || html.includes('Mémoire')) {
        match = { file: '/static/results-text/device-memory.txt', group: '4hardware' };
      }

      if (match) {
        self.attr('data-group', match.group);
        self.parent().attr('data-group', match.group);
        getText(match.file, self);
      }
    });

    $('#default-button').on('click', function(e) {
      $('#default-button').addClass('active');
      $('#detailed-button').removeClass('active');
      $('.detailed').hide();
    });

    $('#detailed-button').addClass('active');
    $('#detailed-button').on('click', function(e) {
      $('#detailed-button').addClass('active');
      $('#default-button').removeClass('active');
      $('.detailed').show();
    });

    // selecteur de table des matières
    if ($('#characteristic').selectmenu) {
      try {
        $('#characteristic').selectmenu({
          'change': function () {
            var val = $("#characteristic option:selected").val();
            window.location.hash = val.replace(/^#/, '');
          }
        });
      } catch (e) {
        $('#characteristic').on('change', function () {
          window.location.hash = this.value.replace(/^#/, '');
        });
      }
    } else {
      $('#characteristic').on('change', function () {
        window.location.hash = this.value.replace(/^#/, '');
      });
    }

    // Trier les résultats par groupe
    sortUsingNestedText($('.detailed-results'), "div.results-table", "h4");

    // Ajouter les titres de sections regroupées
    if ($('[data-group="1header"]').length && !$('#group-header-1').length) {
      $("<h3 id='group-header-1'>En-têtes HTTP</h3>").insertBefore($('[data-group="1header"]').first());
    }
    if ($('[data-group="2browser"]').length && !$('#group-header-2').length) {
      $("<h3 id='group-header-2'>Caractéristiques du navigateur</h3>").insertBefore($('[data-group="2browser"]').first());
    }
    if ($('[data-group="3fingerprint"]').length && !$('#group-header-3').length) {
      $("<h3 id='group-header-3'>Métriques d'empreinte (Fingerprint)</h3>").insertBefore($('[data-group="3fingerprint"]').first());
    }
    if ($('[data-group="4hardware"]').length && !$('#group-header-4').length) {
      $("<h3 id='group-header-4'>Spécifications matérielles</h3>").insertBefore($('[data-group="4hardware"]').first());
    }
  }, 1000);
});
