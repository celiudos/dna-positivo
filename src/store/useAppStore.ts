
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSetter } from '@/store/zustandHelpers';

// https://zustand.docs.pmnd.rs/middlewares/combine

const storeDefaultMain: IStoreDefault = {
  favorito: { version: "2", favoritos: null },
  favoritoAlterado: null,
  carregandoPagina: 0,
  postsNovos: undefined,
  posts: undefined,
  allPosts: undefined,
};

const appStore = (set, get) => ({
  /** ---------------- estado default ---------------- */
  ...storeDefaultMain,

  /** --------------- setters “genéricos” ------------- */
  // Sem transformação
  setFavorito: createSetter('favorito')(set),
  setFavoritoAlterado: createSetter('favoritoAlterado')(set),
  setCarregandoPagina: createSetter('carregandoPagina')(set),
  setPostsNovos: createSetter('postsNovos')(set),
  setPosts: createSetter('posts')(set),
  setAllPosts: createSetter('allPosts')(set),
});

const useAppStore = create(
  devtools(appStore, {
    name: 'appStore',
    enabled: process.env.NODE_ENV !== 'production',
  })
);

export default useAppStore;
export { storeDefaultMain as storeDefault };
