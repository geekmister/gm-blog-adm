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
                redirect: '/blogArticles/articlesAdm/index',
                children: [
                    {
                        path: 'index',
                        name: 'index',
                        meta: { title: '文章列表'},
                        component: () => import('@/pages/blog-articles/articles-adm/index.vue')
                    },
                    {
                        path: 'add',
                        name: 'add',
                        meta: { title: '添加文章'},
                        component: () => import('@/pages/blog-articles/articles-adm/add.vue')
                    },
                    {
                        path: 'edit',
                        name: 'edit',
                        meta: { title: '编辑文章'},
                        component: () => import('@/pages/blog-articles/articles-adm/edit.vue')
                    },
                    {
                        path: 'preview',
                        name: 'preview',
                        meta: { title: '文章预览', hidden: true},
                        component: () => import('@/pages/blog-articles/articles-adm/preview.vue')
                    },
                ]
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
