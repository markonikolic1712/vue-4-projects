import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import AddRecepieView from '@/views/AddRecepieView.vue';
import RecepieView from '@/views/RecepieView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import EditRecepieView from '@/views/EditRecepieView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/add-recepie',
      name: 'add-recepie',
      component: AddRecepieView,
    },
    {
      path: '/recepie/:id/edit',
      name: 'edit-recepie',
      component: EditRecepieView,
    },
    {
      path: '/recepie/:id',
      name: 'recepie',
      component: RecepieView,
    },
    {
      // definise se komponenta koja ce se prikazati ako se posalje request na path koji nije definisan
      // pathMatch(.*) - . znaci bilo koji karakter a * znaci bilo koliko puta da se ponovi bilo koji karakter (ono sto je .)
      // pathMatch - ne mora ovako da se definise, moze bilo kako. Vazno je (.*)
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
