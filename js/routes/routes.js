const routes = [
    {
        path: '/editor',
        name: 'editor',
        component: Editor
    },
    {
        path: '/view',
        name: 'view',
        component: View
    },
    {
        path: '*',
        component: Editor
    },
]