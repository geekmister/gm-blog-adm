import Layout from '@/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
    {
        path: '/blogArticles',
        component: Layout,
        redirect: '/blogArticles/articlesAdm/index',
        name: 'blogArticles',
        meta: { title: '博客文章', icon: DashboardIcon },
        children: [
            {
                path: 'articlesAdm',
                name: 'articlesAdm',
                redirect: '/blogArticles/articlesAdm/index',
                meta: { title: '文章管理', icon: DashboardIcon },
                children: [
                    {
                        path: 'index',
                        name: 'index',
                        component: () => import('@/pages/blog-articles/articles-adm/index.vue'),
                        meta: { title: '文章列表', hidden: true },
                    }
                ]
            },
            {
                path: 'scAdm',
                name: 'scAdm',
                redirect: '/blogArticles/scAdm/index',
                meta: { title: '专栏管理', icon: DashboardIcon },
                children: [
                    {
                        path: 'index',
                        name: 'index',
                        component: () => import('@/pages/blog-articles/sc-adm/index.vue'),
                        meta: { title: '专栏列表', hidden: true },
                    }
                ]
            },
        ],
    },
];
