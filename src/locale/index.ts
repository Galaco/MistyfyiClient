export default function(l: any) {
    return new l({
        locale: 'en',
        messages: {
            en: {
                app_title: 'MapTracker',
                header: {
                    links: {
                        login: 'Log in/Register',
                        logout: 'Log out',
                        openApp: 'Go to app',
                    },
                },
                footer: {
                    description: ' is a dedicated game server map rotation tracker.',
                    owner: 'A project by ',
                },
                home: {
                    about: {
                        title: 'MapTracker',
                        tagline1: 'MapTracker is a near-realtime notification tool for watching map rotations on dedicated video game servers.',
                        tagline2: 'Receive notifications on your device when servers you like switch to a map you enjoy.',
                        taglineImageFallback: 'How does MapTracker work?',
                    },
                    features: {
                        feature1: {
                            paragraph1: 'Never miss a map again! Play only the maps you love, in the places you love.',
                            paragraph2: 'Near-realtime notifications pushed to your device when your favourite games servers switch to maps you love.',
                        },
                        feature2: {
                            paragraph1: 'All popular Source Engine games are supported, including Counterstrike: Global Offensive, Garry\'s Mod, Counterstrike: Source',
                            paragraph2: 'Is your favorite game not supported? Please make a request and we\'ll endeavour to add it to our service.',
                        },
                    },
                    pricing: {
                        title: 'Pricing',
                        strapline: 'This is a one-map hobby project, but is expensive to keep running. By supporting this project with a small yearly fee, you can keep this project running, and you\'ll receive plenty of benefits.',
                        notice: 'All money received will go towards hosting costs.',
                        free: {
                            title: 'Free',
                            feature1: 'Monitor up to 3 game servers concurrently',
                            feature2: 'Watch for up to 3 specific map/level names across watched game servers',
                        },
                        paid: {
                            title: 'Donator (coming soon...)',
                            feature1: 'Monitor up to 20 game servers concurrently',
                            feature2: 'Watch for up to 50 specific map/level names across watched game servers',
                            feature3: 'Wildcard map/level name support',
                        },
                    },
                },
                servers: {
                    servers: {
                        title: 'Watched Servers',
                        instructions: {
                            free: 'As a free user, you may watch up to 3 servers. You may also watch for up to 5 map names.',
                            paid: 'As a paid user, you may watch up to 20 servers. You may also watch for up to 50 map names. Wildcard (*) names are also supported, e.g. \'de_dust*\'',
                        },
                        buttons: {
                            add: 'Add server',
                            history: 'History',
                            delete: 'Delete',
                        },
                        list: {
                            headers: {
                                server: 'Server',
                                address: 'Address',
                                map: 'Current Map',
                                updated: 'Updated',
                            },
                        },
                        noItems: {
                            add: 'Add first server',
                            title: 'You have not added any servers yet.',
// tslint:disable-next-line:max-line-length
                            description: 'Once you add your favourite servers, you can view what they are playing here.',
                        },
                        dialogs: {
                            add: {
                                title: 'Add Server',
                                form: {
                                    ip: 'Server IP Address:',
                                    ipPlaceholder: 'Server ip (e.g. 127.0.0.1)',
                                    port: 'Server port (optional):',
                                    portPlaceholder: 'Server port (e.g. 27015)',
                                },
                            },
                            delete: {
                                title: 'Delete Server',
                                body: 'Are you sure you want to delete this server? This action cannot be undone.',
                            },
                            history: {
                                title: 'Server History',
                                body: {
                                    headers: {
                                        date: 'Changed',
                                        mapName: 'Map Name',
                                    },
                                },
                            },
                        },
                    },
                    mapNames: {
                        title: 'Watched Map Names',
                        buttons: {
                            add: 'Add watch name',
                            delete: 'Delete',
                        },
                        noItems: {
                            add: 'Add first map name',
                            title: 'You have not added any map names yet.',
                            description: 'Once you add map names, you can start receiving notifications when your favourite servers play them.',
                        },
                        dialogs: {
                            add: {
                                title: 'Add Map Name',
                                form: {
                                    name: 'Map name:',
                                    namePlaceholder: 'Map name',
                                },
                            },
                            delete: {
                                title: 'Delete Map Name',
                                body: 'Are you sure you want to delete this watched map? This action cannot be undone.',
                            },
                        },
                    },
                },
                dialog: {
                    buttons: {
                        confirm: 'Confirm',
                        cancel: 'Cancel',
                        close: 'Close',
                        save: 'Save',
                        delete: 'Delete',
                    },
                },
                table: {
                    headers: {
                        actions: 'Actions',
                    },
                },
            },
        },
    });
}


