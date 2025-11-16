import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// kreiramo tip podatka Recepie
export interface Recepie {
  id: string;
  name: string;
  description: string;
}

// kreira se tip podatka NewRecepiee koji je isti kao Recepie samo bez property-a id
// Omit je kljucna rec koja je iz TypeScript-a
type NewRecepie = Omit<Recepie, 'id'>;

export const useRecepieStore =
  // definisemo state koji se zove recepie
  defineStore('recepie', () => {
    //////////////////////////////////////////////////////////
    ////////////////// properties - pocetak //////////////////
    //////////////////////////////////////////////////////////
    // definise se property u state-u koji ce sadrzati niz Recepie objekata
    const recepies = ref<Recepie[]>([]);
    const favoritieIds = ref<string[]>([]);
    ///////////////////////////////////////////////////////
    ////////////////// properties - kraj //////////////////
    ///////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    ////////////////// actions - pocetak //////////////////
    ///////////////////////////////////////////////////////
    const addRecepie = (recepie: NewRecepie) => {
      // kada se iz forme posalju podaci od kojih treba da se kreira novi Recepie objekat ovde mu se dodeljuje id
      const newRecepie = {
        id: Date.now().toString(),
        name: recepie.name,
        description: recepie.description,
      };
      recepies.value.push(newRecepie);
      return newRecepie;
    };

    const editRecepie = (updatedRecepie: Recepie) => {
      const index = recepies.value.findIndex((recepie) => recepie.id === updatedRecepie.id);
      // kada se nadje indeks objekta u nizu radi se replace tog objekta
      // prvo se proverava da li je nadjen. Ako je index = -1 to znaci da funkcija findIndex nije nasla objekat u nizu
      if (index !== -1) {
        recepies.value[index] = updatedRecepie;
      }
    };

    // dodavanje ili uklanjanje recepta iz liste favorita
    const toggleFavorite = (id: string) => {
      // ako id vec postoji u favoritima onda se uklanja
      if (favoritieIds.value.includes(id)) {
        // ako id vec postoji u favoritima onda se uklanja
        // prolazi se kroz niz id favorita i niz se opet popunjava sa svim vrednostima osim sa onim id koji se uklanja iz liste
        favoritieIds.value = favoritieIds.value.filter((favId) => favId !== id);
      } else {
        // ako ga nema u listi onda se dodaje
        favoritieIds.value.push(id);
      }
    };
    ////////////////////////////////////////////////////
    ////////////////// actions - kraj //////////////////
    ////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////
    ////////////////// getters - pocetak //////////////////
    ///////////////////////////////////////////////////////
    // uzimanje recepie objekta po id-u
    const getRecepieById = (id: string) => {
      return recepies.value.find((r) => r.id === id);
    };

    const filteredRecepies = (searchQuery: string) => {
      const r = recepies.value.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      if (r == undefined) return [];
      return r;
    };

    // vraca podatak da li je neki recepie.id u favoritima ili nije
    const isFavorite = (id: string) => {
      return favoritieIds.value.includes(id);
    };

    const favoriteRecepies = computed(() => recepies.value.filter(recepie => isFavorite(recepie.id)))
    ////////////////////////////////////////////////////
    ////////////////// getters - kraj //////////////////
    ////////////////////////////////////////////////////

    // sa return{} moraju da se vrate state, action i getter da bi bili dostupni za koriscenje
    return {
      recepies,
      addRecepie,
      getRecepieById,
      filteredRecepies,
      editRecepie,
      favoritieIds,
      toggleFavorite,
      isFavorite,
      favoriteRecepies,
    };
  });
