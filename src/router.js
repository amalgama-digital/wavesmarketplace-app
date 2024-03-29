import VueRouter from 'vue-router';

import Front from './pages/Front';
import Home from './pages/Home';
import User from './pages/User';
import Collection from './pages/Collection';
import Asset from './pages/Asset';
import News from './pages/News';

const routes = [
    {
        path: '/',
        name: 'front',
        component: Front,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/user/:address',
                name: 'User',
                component: User,
            },
            {
                path: '/collection/:name',
                name: 'Collection',
                component: Collection,
            },
            {
                path: '/asset/:id',
                name: 'Asset',
                component: Asset,
            },
            {
                path: '/news',
                name: 'News',
                component: News,
            },
        ],
    },
];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

export default router;
