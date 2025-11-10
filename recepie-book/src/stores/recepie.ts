import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// kreiramo tip podatka Recepie
interface Recepie {
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
    ////////////////// properties //////////////////
    // definise se property u state-u koji ce sadrzati niz Recepie objekata
    const recepies = ref<Recepie[]>([]);

    ////////////////// actions //////////////////
    const addRecepie = (recepie: NewRecepie) => {
      // kada se iz forme posalju podaci od kojih treba da se kreira novi Recepie objekat ovde mu se dodeljuje id
      const newRecepie = {
        id: Date.now().toString(),
        name: recepie.name,
        description: recepie.description,
      };
      recepies.value.push(newRecepie);
      console.log(`recepies.ts - addRecepie(): ` + JSON.stringify(newRecepie));
      return newRecepie;
    };

    ////////////////// getters //////////////////
    // uzimanje recepie objekta po id-u
    const getRecepieById = (id: string) => {
      return recepies.value.find((r) => r.id === id);
    };

    const filteredRecepies = (searchQuery: string) => {
      const r = recepies.value.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if(r == undefined) return [];
      return r;
    };

    // sa return{} moraju da se vrate state, action i getter da bi bili dostupni za koriscenje
    return { recepies, addRecepie, getRecepieById, filteredRecepies };
  });
