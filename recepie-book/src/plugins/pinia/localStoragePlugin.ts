import type { PiniaPluginContext } from 'pinia';

// kod u plugin funkciji je inicijalizaciski kod i on s epokrece samo jedanput i to kada se plugin registruje u pinia u main.ts
// ovaj pinia plugin je funkcija koja ima pristup store-u i moze da manipulise njime
// PiniaPluginContext ima pristup store-u (context.store)
const localStoragePlugin = (context: PiniaPluginContext) => {
  const { store } = context;

  // store ima pristup localStorage-u
  // property store.$id je podatak koji smo prosledili prilikom kreiranja atate-a u recepir.ts i to je 'recepie' (ovo je u recepie.ts: defineStore('recepie', () => {)
  // 1. pinia prvo pokusava da procita stanje iz state-a aplikacije
  // 2. ako nema 'recepie' u state-u onda s eucitavaju podaci iz browser-a
  const storedState = localStorage.getItem(store.$id);

  // ako je store state undefined ili null onda se ucitavaju podaci iz browser-a
  // ako u store-u ne postoji state sa imenom ($id) 'recepie' onda se ucitavaju podaci iz browsera
  if (storedState) {
    store.$patch(JSON.parse(storedState));
  }

  // kada se izmene neki podaci onda pozivamo action da promeni stanje u state-u

  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
};

export default localStoragePlugin;
