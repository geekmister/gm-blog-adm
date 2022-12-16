import Layout from '@/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
    {
        path: '/blogArticles',
        component: Layout,
        redirect: '/blogArticles/articlesAdm',
        name: 'blogArticles',
        meta: { title: '博客文章', icon: DashboardIcon },
        children: [
            {
                path: 'articlesAdm',
                name: 'articlesAdm',
                meta: { title: '文章管理', icon: DashboardIcon },
                component: () => import('@/pages/blog-articles/articles-adm/index.vue')
            },
            {
                path: 'scAdm',
                name: 'scAdm',
                meta: { title: '专栏管理', icon: DashboardIcon },
                component: () => import('@/pages/blog-articles/sc-adm/index.vue')
            }
        ],
    },
];
