import hashlib


class FingerprintHelper(object):
    whorl_v2_names = {
        'user_agent': "Agent utilisateur (User-Agent)",
        'http_accept': "En-têtes HTTP_ACCEPT",
        'plugins': "Détails des modules et plugins",
        'timezone': "Décalage du fuseau horaire",
        'timezone_string': "Fuseau horaire",
        'video': "Résolution d'écran et profondeur des couleurs",
        'fonts_v2': "Polices système",
        'cookie_enabled': "Cookies activés\xa0?",
        'supercookies_v2': "Test limité des supercookies",
        'canvas_hash_v2': "Empreinte Canvas (hash)",
        'webgl_hash_v2': "Empreinte WebGL (hash)",
        'webgl_vendor_renderer': "Fournisseur et moteur de rendu WebGL",
        'dnt_enabled': "En-tête DNT (Do Not Track) activé\xa0?",
        'language': "Langue du système / navigateur",
        'platform': "Plateforme / Système d'exploitation",
        'touch_support': "Prise en charge tactile",
        'ad_block': "Bloqueur de publicités détecté",
        'audio': "Empreinte AudioContext",
        'cpu_class': "Classe du processeur",
        'hardware_concurrency': "Cœurs processeur (concurrence matérielle)",
        'device_memory': "Mémoire de l'appareil (Go)"
    }

    whorl_v3_names = {
        'user_agent': "Agent utilisateur (User-Agent)",
        'http_accept': "En-têtes HTTP_ACCEPT",
        'loads_remote_fonts': "Chargement de polices distantes",
        'plugins': "Détails des modules et plugins",
        'timezone': "Décalage du fuseau horaire",
        'timezone_string': "Fuseau horaire",
        'video': "Résolution d'écran et profondeur des couleurs",
        'fonts_v2': "Polices système",
        'cookie_enabled': "Cookies activés\xa0?",
        'supercookies_v2': "Test limité des supercookies",
        'canvas_hash_v2': "Empreinte Canvas (hash)",
        'webgl_hash_v2': "Empreinte WebGL (hash)",
        'webgl_vendor_renderer': "Fournisseur et moteur de rendu WebGL",
        'dnt_enabled': "En-tête DNT (Do Not Track) activé\xa0?",
        'language': "Langue du système / navigateur",
        'platform': "Plateforme / Système d'exploitation",
        'touch_support': "Prise en charge tactile",
        'ad_block': "Bloqueur de publicités détecté",
        'audio': "Empreinte AudioContext",
        'cpu_class': "Classe du processeur",
        'hardware_concurrency': "Cœurs processeur (concurrence matérielle)",
        'device_memory': "Mémoire de l'appareil (Go)"
    }

    # Which keys should be added to the expansion fingerprint tables?
    fingerprint_expansion_keys = {
        'v2': [
            'fonts_v2',
            'supercookies_v2',
            'canvas_hash_v2',
            'webgl_hash_v2',
            'timezone_string',
            'webgl_vendor_renderer',
            'ad_block',
            'audio',
            'cpu_class',
            'hardware_concurrency',
            'device_memory'
        ],
        'v3': [
            'loads_remote_fonts'
        ]
    }

    # Any value that is ever expected to be over 255 characters (the length of
    # the 'value' field in 'totals') should be contained in this list.
    md5_keys = [
        'plugins',
        'fonts_v2',
        'user_agent',
        'http_accept',
        'supercookies_v2',
        'touch_support',
        'webgl_vendor_renderer',
        'cpu_class'
    ]

    @classmethod
    def value_or_md5(cls, whorls):
        # within the live totals table, using the md5 hash of some long string
        # values is more efficient for queries that are just looking for total
        # value count
        md5_whorls = whorls.copy()
        for i in md5_whorls:
            if i in cls.md5_keys:
                md5_whorls[i] = hashlib.md5(
                    md5_whorls[i].encode('ascii', 'ignore')).hexdigest()
        return md5_whorls
